import React, { useState, useEffect } from 'react'
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
import { Gallery } from 'react-grid-gallery'
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { MenuLink } from '../../components/Navigation/styles'

const ProductPage = ({ data }) => {
    const product = data.shopifyProduct
    const collection = data.shopifyCollection
    const isMessedUp = product.title.toLowerCase().search("messed up") >= 0;
    const med = product.media;
    const images = isMessedUp ? ProductImages.messed_up : ProductImages.missed_ops;

    const [index, setIndex] = useState(-1);

    const currentImage = images[index];
    const nextIndex = (index + 1) % images.length;
    const nextImage = images[nextIndex] || currentImage;
    const prevIndex = (index + images.length - 1) % images.length;
    const prevImage = images[prevIndex] || currentImage;
  
    const handleClick = (index, item) => setIndex(index);
    const handleClose = () => setIndex(-1);
    const handleMovePrev = () => setIndex(prevIndex);
    const handleMoveNext = () => setIndex(nextIndex);

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
                                image={
                                    med[0].image.gatsbyImageData
                                }
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
                        images={images}
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
