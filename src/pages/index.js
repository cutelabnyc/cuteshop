import React, { useState } from 'react'
import { graphql, useStaticQuery } from 'gatsby'

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
import { Gallery } from 'react-grid-gallery'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'
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

    const images = ProductImages.missed_ops
    const product = query.allShopifyCollection.edges[0].node.products[0]
    const collections = query.allShopifyCollection

    const [index, setIndex] = useState(-1)

    const currentImage = images[index]
    const nextIndex = (index + 1) % images.length
    const nextImage = images[nextIndex] || currentImage
    const prevIndex = (index + images.length - 1) % images.length
    const prevImage = images[prevIndex] || currentImage

    const handleClick = (index, item) => setIndex(index)
    const handleClose = () => setIndex(-1)
    const handleMovePrev = () => setIndex(prevIndex)
    const handleMoveNext = () => setIndex(nextIndex)

    console.log(collections)

    return (
        <>
            <SEO title={'Welcome!'} description={product.description} />
            <ProductWrapper>
                <Container style={{ padding: '8px' }}>
                    {collections.edges.map((collection, key) => {
                        return <Dropdown productCollection={collection.node} />
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
                        images={ProductImages.missed_ops}
                        margin={15}
                        enableImageSelection={false}
                        onClick={handleClick}
                    />
                </GalleryContainer>
            </Wrapper>

            {!!currentImage && (
                /* @ts-ignore */
                <Lightbox
                    mainSrc={currentImage.original}
                    imageTitle={currentImage.caption}
                    mainSrcThumbnail={currentImage.src}
                    nextSrc={nextImage.original}
                    nextSrcThumbnail={nextImage.src}
                    prevSrc={prevImage.original}
                    prevSrcThumbnail={prevImage.src}
                    onCloseRequest={handleClose}
                    onMovePrevRequest={handleMovePrev}
                    onMoveNextRequest={handleMoveNext}
                />
            )}
        </>
    )
}

export default IndexPage
