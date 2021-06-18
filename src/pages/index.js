import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
    Img,
    Container,
    TwoColumnGrid,
    GalleryContainer,
    GridLeft,
    GridRight,
} from '~/utils/styles'
import ProductImages from '../components/assets/product-assets'
import { MenuLink } from '../components/Navigation/styles'
import Gallery from 'react-grid-gallery';
import { ProductTitle, ProductDescription, ProductWrapper, Wrapper } from '../templates/ProductPage/styles'

const IndexPage = () => {
    const query = useStaticQuery(
        graphql`
            query {
                allShopifyCollection(sort: { fields: [id], order: DESC }) {
                    edges {
                        node {
                            # Pull in collection handle
                            handle

                            # Pull in Product stuff
                            products{
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
            <SEO title={"Welcome!"} description={product.description} />
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
                            <ProductForm product={product} />
                            <hr />
                            <ProductDescription
                                dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                            />
                        </GridRight>
                    </TwoColumnGrid>
                </Container>
                <hr />
                <GalleryContainer>
                    <Gallery images={ProductImages} margin={15} enableImageSelection={false}/>
                </GalleryContainer>
            </Wrapper>
        </>
    )
}

export default IndexPage
