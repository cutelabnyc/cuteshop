import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import { Gallery, Item } from 'react-photoswipe-gallery'
import 'photoswipe/dist/photoswipe.css'

import SEO from '~/components/seo'
import ProductForm from '~/components/ProductForm'
import Dropdown from '~/components/Navigation/dropdown'
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
import { Gallery as ReactGridGallery } from 'react-grid-gallery'
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

    const images = ProductImages.mom_jeans
    const product = query.allShopifyCollection.edges[0].node.products.find(
        p => p.handle === 'mom-jeans'
    )

    const collections = query.allShopifyCollection

    // Custom click handler that opens PhotoSwipe
    const handleClick = (index, item) => {
        // The PhotoSwipe Item component will handle this automatically
        // when clicked, so we don't need manual state management
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
            <div>hi</div>
            <SEO title={'Welcome!'} description={product.description} />
            <ProductWrapper>
                <Container style={{ padding: '8px' }}>
                    {collections.edges.map((collection, key) => {
                        return <Dropdown productCollection={collection.node} key={key} />
                    })}
                </Container>
            </ProductWrapper>
            <Wrapper>
                <Container>
                    <TwoColumnGrid>
                        <GridLeft>
                            {product.media.map(med => (
                                <Img
                                    image={med.image.gatsbyImageData}
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
                                    title={img.caption}
                                    width={img.width * 10}
                                    height={img.height * 10}
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

export default IndexPage