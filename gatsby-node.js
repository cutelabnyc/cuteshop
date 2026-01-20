const path = require(`path`)

exports.createPages = ({ actions, graphql }) => {
  const { createPage, createRedirect } = actions
  const miscPageTemplate = require.resolve(`./src/templates/MiscPages/index.js`)

  return graphql(`
    {
      allShopifyCollection {
        edges {
          node {
            title
            handle
            products {
              title
              handle
            }
          }
        }
      }
      allMarkdownRemark(sort: { frontmatter: { title: DESC } }, limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `).then(result => {
    // Create Shopify product pages
    result.data.allShopifyCollection.edges.forEach(({ node }) => {
      let collectionHandle = node.handle

      node.products.forEach(product => {
        createPage({
          path: `/${collectionHandle}/${product.handle}/`,
          component: path.resolve(`./src/templates/ProductPage/index.js`),
          context: {
            handle: product.handle,
            collectionHandle: collectionHandle,
          },
        })
      })
    })

    createRedirect({
      fromPath: '/eurorack/*',
      toPath: '/modules/:splat',
      isPermanent: true,
      redirectInBrowser: true, // required for gatsby develop
    })

    createPage({
      path: '/eurorack', // the static path
      matchPath: '/eurorack/*', // client-only match
      component: path.resolve('./src/templates/eurorack-redirect.js'),
    })

    // Create misc pages (footer pages)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        component: miscPageTemplate,
        context: {
          slug: node.frontmatter.slug,
        },
      })
    })
  })
}
