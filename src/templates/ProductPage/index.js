import React from 'react'
import { graphql } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
    Img,
    Container,
    GalleryContainer,
    TwoColumnGrid,
    GridLeft,
    GridRight,
} from '~/utils/styles'

import {
    ProductTitle,
    ProductDescription,
    ProductWrapper,
    Wrapper,
    ProductSeparator,
} from './styles'
import ProductImages from '../../components/assets/product-assets'
import Gallery from 'react-grid-gallery'
import { MenuLink } from '../../components/Navigation/styles'

const ProductPage = ({ data }) => {
    const product = data.shopifyProduct
    const collection = data.shopifyCollection
    const isMessedUp = product.title.toLowerCase().search("messed up") >= 0;

    return (
        <>
            <SEO title={product.title} description={product.description} />
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
                            <Img
                                fluid={
                                    product.images[0].localFile.childImageSharp
                                        .fluid
                                }
                                alt={product.title}
                            />
                        </GridLeft>
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
                    <Gallery
                        images={isMessedUp ? ProductImages.messed_up : ProductImages.missed_ops}
                        margin={15}
                        enableImageSelection={false}
                    />
                </GalleryContainer>
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
        shopifyCollection(handle: { eq: $collectionHandle }) {
            handle
            products {
                title
                handle
            }
        }
    }
`

export default ProductPage
