#!/usr/bin/env node
// Runs a command (e.g. `gatsby build`) with a fresh Shopify Admin API token.
//
// Dev Dashboard apps don't have a permanent Admin token: the client ID and
// secret are exchanged for one that expires after ~24 hours. This fetches one
// and passes it to the command as SHOPIFY_SHOP_PASSWORD, which is what
// gatsby-config.js hands to gatsby-source-shopify.
//
// If SHOPIFY_CLIENT_ID / SHOPIFY_CLIENT_SECRET aren't set, the command runs
// with whatever SHOPIFY_SHOP_PASSWORD is already in the environment.

const { spawn } = require('child_process')

const [command, ...args] = process.argv.slice(2)
if (!command) {
  console.error('usage: with-shopify-token.js <command> [args...]')
  process.exit(1)
}

const nodeEnv =
  process.env.NODE_ENV ||
  (args.includes('develop') ? 'development' : 'production')
require('dotenv').config({ path: `.env.${nodeEnv}` })

async function fetchToken() {
  const { SHOPIFY_CLIENT_ID, SHOPIFY_CLIENT_SECRET, GATSBY_SHOPIFY_STORE_URL } =
    process.env
  if (!SHOPIFY_CLIENT_ID || !SHOPIFY_CLIENT_SECRET) return null
  if (!GATSBY_SHOPIFY_STORE_URL) {
    throw new Error('GATSBY_SHOPIFY_STORE_URL is not set')
  }

  const response = await fetch(
    `https://${GATSBY_SHOPIFY_STORE_URL}/admin/oauth/access_token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: SHOPIFY_CLIENT_ID,
        client_secret: SHOPIFY_CLIENT_SECRET,
      }),
    }
  )
  const text = await response.text()
  let token
  try {
    token = JSON.parse(text).access_token
  } catch (e) {
    // Shopify answers some failures with an HTML page; its <title> has the reason.
  }
  if (!response.ok || !token) {
    const reason = (text.match(/<title>(.*?)<\/title>/) || [])[1] || text
    throw new Error(
      `Shopify token request failed (${response.status}): ${reason.slice(0, 300)}`
    )
  }
  return token
}

fetchToken()
  .then(token => {
    const env = { ...process.env }
    if (token) env.SHOPIFY_SHOP_PASSWORD = token
    // A Gatsby dependency still loads Node's deprecated built-in punycode
    // module. Gatsby prints the warning as "ERROR UNKNOWN", which reads like a
    // failed build, so hide that one deprecation code.
    env.NODE_OPTIONS = [env.NODE_OPTIONS, '--disable-warning=DEP0040']
      .filter(Boolean)
      .join(' ')
    const child = spawn(command, args, {
      stdio: 'inherit',
      env,
      shell: process.platform === 'win32',
    })
    child.on('exit', code => process.exit(code === null ? 1 : code))
    child.on('error', err => {
      console.error(err.message)
      process.exit(1)
    })
  })
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
