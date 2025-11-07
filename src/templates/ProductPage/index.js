import React from 'react'
import { graphql } from 'gatsby'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

import Dropdown from '../../components/Navigation/dropdown'
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

const ProductPage = ({ data }) => {
    const product = data.shopifyProduct
    const collections = data.allShopifyCollection
    const med = product.media
    let images = []

    if (product.title.toLowerCase().search('mom') >= 0) {
        images = ProductImages.mom_jeans
    } else if (product.title.toLowerCase().search('messed up') >= 0) {
        images = ProductImages.messed_up
    } else {
        images = ProductImages.missed_ops
    }

    // Transform images to ensure they have the required PhotoSwipe properties
    const transformedImages = images.map(img => ({
        ...img,
        // Ensure we have the required dimensions for PhotoSwipe
        width: img.width || 1200,
        height: img.height || 800,
    }))

    return (
        <>
            <SEO title={product.title} description={product.description} />
            <ProductWrapper>
                <Container style={{ padding: '8px' }}>
                    {collections.nodes.map((collection, key) => {
                        return <Dropdown productCollection={collection} key={key} />
                    })}
                </Container>
            </ProductWrapper>
            <Wrapper>
                <Container>
                    <TwoColumnGrid>
                        <GridLeft>
                            <Img
                                image={med[0].image.gatsbyImageData}
                                key={med[0].id}
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
                        options={{
                            // PhotoSwipe options
                            showHideAnimationType: 'fade',
                            showAnimationDuration: 300,
                            hideAnimationDuration: 300,
                        }}
                    >
                        <div style={{ display: 'grid', gap: '15px', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
                            {transformedImages.map((img, index) => (
                                <Item
                                    key={index}
                                    original={img.original}
                                    thumbnail={img.src}
                                    width={img.width * 10}
                                    height={img.height * 10}
                                    title={img.caption}
                                >
                                    {({ ref, open }) => (
                                        <img
                                            ref={ref}
                                            onClick={open}
                                            src={img.src}
                                            alt={img.caption || `Image ${index + 1}`}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                cursor: 'pointer',
                                                borderRadius: '4px',
                                                transition: 'transform 0.2s ease',
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.transform = 'scale(1.05)'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.transform = 'scale(1)'
                                            }}
                                        />
                                    )}
                                </Item>
                            ))}
                        </div>
                    </Gallery>
                </GalleryContainer>
            </Wrapper>
        </>
    )
}

export const query = graphql`
    query ($handle: String!) {
        shopifyProduct(handle: { eq: $handle }) {
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
        allShopifyCollection(sort: { id: ASC }) {
            nodes {
                title
                handle
                products {
                    title
                    handle
                }
            }
        }
    }
`

export default ProductPage