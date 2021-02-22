import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
    Img,
    Container,
    TwoColumnGrid,
    GridLeft,
    GridRight,
} from '~/utils/styles'

import {
    ProductTitle,
    ProductDescription,
    ProductWrapper,
    Wrapper
} from './styles'

import { MenuLink } from '../../components/Navigation/styles'

const ProductPage = ({ data }) => {

    const product = data.shopifyProduct
    const collection = data.shopifyCollection

    return (
        <>
            <SEO title={product.title} description={product.description} />
            <ProductWrapper>
                <Container style={{ padding: "8px" }}>
                    {collection.products.map((product, key) => {
                        return (
                            <MenuLink
                                to={`${collection.handle}/${product.handle}`}
                                key={key}
                            >
                                {product.title}
                            </MenuLink>
                        )
                    })}
                </Container>
            </ProductWrapper>
            <Wrapper>
                <Container>
                    <TwoColumnGrid>
                        <GridLeft>
                            {product.images.map(image => (
                                <Img
                                    fluid={image.localFile.childImageSharp.fluid}
                                    key={image.id}
                                    alt={product.title}
                                />
                            ))}
                        </GridLeft>
                        <GridRight>
                            <ProductTitle>{product.title}</ProductTitle>
                            <ProductDescription
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                            <ProductForm product={product} />
                        </GridRight>
                    </TwoColumnGrid>
                </Container>
            </Wrapper>
        </>
    )
}

export const query = graphql`
  query($handle: String!, $collectionHandle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      title
      handle
      productType
      description
      descriptionHtml
      shopifyId
      options {
        id
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
      images {
        originalSrc
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 910) {
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
    }
    shopifyCollection(handle: { eq: $collectionHandle }){
        handle
        products {
            title
            handle
        }
    }
  }
`

export default ProductPage
