# CuteShop

CuteLab's modular synth storefront, at [shop.cutelab.nyc](https://shop.cutelab.nyc). A static [Gatsby](https://www.gatsbyjs.com/) site that reads products from Shopify at build time and uses Shopify for the cart and checkout.

Originally based on [gatsby-shopify-starter](https://github.com/AlexanderProd/gatsby-shopify-starter).

## Setup

Requires Node 22 (see `.nvmrc`).

```sh
npm install
```

Create `.env.development` and `.env.production` in the project root (both are gitignored):

```
# Build time: Admin API, used by gatsby-source-shopify
SHOPIFY_CLIENT_ID=...
SHOPIFY_CLIENT_SECRET=...
GATSBY_SHOPIFY_STORE_URL=yourshop.myshopify.com

# Browser: Storefront API, used by the cart (src/provider/ContextProvider.js)
GATSBY_SHOPIFY_ACCESS_TOKEN=...
GATSBY_SHOP_NAME=yourshop
```

## Commands

| Command           | What it does                              |
| ----------------- | ----------------------------------------- |
| `npm run develop` | Dev server at `http://localhost:8000`     |
| `npm run build`   | Production build into `public/`           |
| `npm run serve`   | Serve the production build locally        |
| `npm run clean`   | Clear Gatsby's cache (`.cache`, `public`) |
| `npm run format`  | Format source with Prettier               |

Always build through the npm scripts rather than calling `gatsby` directly: they run `scripts/with-shopify-token.js`, which fetches the Admin API token the build needs.

## Shopify app

Product data comes from a custom app created in the [Shopify Dev Dashboard](https://dev.shopify.com/dashboard/) and installed on the store.

- **Credentials.** The app's client ID and secret go in the env files. Dev Dashboard apps have no permanent Admin token, so `scripts/with-shopify-token.js` exchanges them for one that lasts about 24 hours and passes it to Gatsby as `SHOPIFY_SHOP_PASSWORD`. If the client ID and secret aren't set, an existing `SHOPIFY_SHOP_PASSWORD` is used as-is.
- **Scopes.** `read_products`, `read_product_listings`, `read_files`.
- **Bulk queries.** Must be enabled for the app under **Settings → Access requests → Enable bulk queries**. Shopify turns this off again if the app hasn't started a bulk query in 31 days, so after a long gap between builds it needs re-enabling.

### Build errors from Shopify

`gatsby-source-shopify` hides the underlying API error. The two that have come up:

- `Cannot read properties of null (reading 'userErrors')`: Shopify refused to start the bulk operation. Usually bulk queries aren't enabled for the app (see above).
- `Operation ... failed with ACCESS_DENIED`: the app is missing a scope, or a new version with the scope hasn't been released and accepted on the store.

## Content

- Products and collections: Shopify. Product pages are generated at `/<collection>/<product>/`.
- Footer pages (FAQ, About, Contact, Dealers): Markdown in `resources/markdown`.
