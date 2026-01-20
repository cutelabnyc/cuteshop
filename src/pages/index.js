import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import 'photoswipe/dist/photoswipe.css'

import SEO from '~/components/seo'
import Dropdown from '~/components/Navigation/dropdown'
import { Img, Container } from '~/utils/styles'
import { ProductWrapper } from '../templates/ProductPage/styles'

const IndexPage = () => {
  const query = useStaticQuery(graphql`
    query {
      allShopifyCollection(sort: { id: ASC }) {
        edges {
          node {
            title
            handle
            products {
              id
              title
              handle
              productType
              collections {
                handle
              }
              description
              descriptionHtml
              shopifyId
              options {
                shopifyId
                name
                values
              }
              variants {
                id
                title
                price
                availableForSale
                shopifyId
                selectedOptions {
                  name
                  value
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
              media {
                ... on ShopifyMediaImage {
                  id
                  image {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  const product = query.allShopifyCollection.edges[0].node.products.find(
    p => p.handle === 'mom-jeans'
  )

  const collections = query.allShopifyCollection

  // Custom click handler that opens PhotoSwipe
  const allProducts = collections.edges.flatMap(edge => edge.node.products)

  const getProductPrice = product => {
    const available = product.variants.filter(v => v.availableForSale)

    const variants = available.length > 0 ? available : product.variants

    const cheapest = variants.reduce((min, v) =>
      parseFloat(v.price) < parseFloat(min.price) ? v : min
    )

    return cheapest.price
  }

  const formatMoney = amount =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(parseFloat(amount))

  return (
    <>
      <SEO title={'Welcome!'} description={product.description} />

      <ProductWrapper>
        <Container style={{ padding: '8px' }}>
          {collections.edges.map((collection, key) => {
            return <Dropdown productCollection={collection.node} key={key} />
          })}
        </Container>
      </ProductWrapper>

      <Container style={{ padding: '16px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '16px',
          }}
        >
          {allProducts.map(prod => {
            const image = prod.media?.[0]?.image?.gatsbyImageData || null
            const price = formatMoney(getProductPrice(prod))

            return (
              <a
                key={prod.id}
                href={`${prod.collections[0].handle}/${prod.handle}`}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  border: '1px solid #EEB9FA',
                  padding: '8px',
                }}
              >
                {image && <Img image={image} alt={prod.title} />}
                <div style={{ marginTop: '8px' }}>
                  <div style={{ fontWeight: 600 }}>{prod.title}</div>
                  <div style={{ fontSize: '0.9em', opacity: 0.7 }}>{price}</div>
                </div>
              </a>
            )
          })}
        </div>
      </Container>
    </>
  )
}

export default IndexPage
