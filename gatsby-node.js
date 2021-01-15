const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
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
    }
  `).then(result => {
        result.data.allShopifyCollection.edges.forEach(({ node }) => {
            let collectionHandle = node.handle

            node.products.forEach((product) => {
                createPage({
                    path: `/${collectionHandle}/${product.handle}/`,
                    component: path.resolve(`./src/templates/ProductPage/index.js`),
                    context: {
                        // Data passed to context is available
                        // in page queries as GraphQL variables.
                        handle: product.handle,
                        collectionHandle: collectionHandle
                    },
                })
            })
        })
    })
}
