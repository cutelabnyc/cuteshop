import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
    Img,
    SImg,
    Container,
    TwoColumnGrid,
    GalleryContainer,
    GridLeft,
    GridRight,
} from '~/utils/styles'
import ProductImages from '../components/assets/product-assets'
import { MenuLink } from '../components/Navigation/styles'
import Gallery from 'react-grid-gallery'
import {
    ProductTitle,
    ProductDescription,
    ProductWrapper,
    Wrapper,
    ProductSeparator,
} from '../templates/ProductPage/styles'

const IndexPage = () => {
    const query = useStaticQuery(
        graphql`
            query {
                allShopifyCollection(sort: {id: DESC}) {
                    edges {
                      node {
                        handle
                        products {
                          id
                          title
                          handle
                          productType
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
        `
    )

    const product = query.allShopifyCollection.edges[0].node.products[0]
    const collection = query.allShopifyCollection.edges[0].node

    return (
        <>
            <SEO title={'Welcome!'} description={product.description} />
            <ProductWrapper>
                <Container style={{ padding: '8px' }}>
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
                        {product.media.map(med => (
                            <Img
                                image={
                                    med.image.gatsbyImageData
                                }
                                key={med.id}
                                alt={product.title}
                            />
                        ))}
                    </GridLeft>
                    <div></div>
                    <GridRight>
                        <ProductTitle>{product.title}</ProductTitle>
                        <ProductForm product={product} />
                        <ProductSeparator />
                        <ProductDescription
                            dangerouslySetInnerHTML={{
                                __html: product.descriptionHtml,
                            }}
                        />
                    </GridRight>
                </TwoColumnGrid>
            </Container>
           
            <ProductSeparator />
            <GalleryContainer>
                {/* <Gallery
                    images={ProductImages.missed_ops}
                    margin={15}
                    enableImageSelection={false}
                /> */}
            </GalleryContainer>
            </Wrapper>
        </>
    )
}

export default IndexPage
