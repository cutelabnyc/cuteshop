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

exports.createPages = async ({ actions, graphql, reporter }) => {
    const { createPage } = actions
    const pageTemplate = require.resolve(`./src/templates/MiscPages/index.js`)
    const result = await graphql(`
      {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          limit: 1000
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `)
    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`)
        return
    }
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: pageTemplate,
            context: {
                // additional data can be passed via context
                slug: node.frontmatter.slug,
            },
        })
    })
}
