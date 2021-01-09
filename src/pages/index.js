import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import {
    Img,
    Container,
    TwoColumnGrid,
    GridLeft,
    GridRight,
} from '~/utils/styles'
import { ProductTitle, ProductDescription } from '../templates/ProductPage/styles'

const IndexPage = ({ data }) => {
    const query = useStaticQuery(
        graphql`
            query {
                allShopifyProduct(sort: { fields: [id], order: DESC }) {
                    edges {
                        node {
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
        `
    )

    const product = data.allShopifyProduct.edges[0].node
    return (
        <>
            <SEO title={product.title} description={product.description} />
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
        </>
    )
}

export default IndexPage
