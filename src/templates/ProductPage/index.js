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
import Gallery from 'react-grid-gallery';
import { MenuLink } from '../../components/Navigation/styles'

const ProductPage = ({ data }) => {

    const product = data.shopifyProduct
    const collection = data.shopifyCollection

    const productImages =
    [
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_b_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_b_thumbnail.jpeg",
            thumbnailWidth: 168,
            thumbnailHeight: 120,
    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_c_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_c_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 120
    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_097_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_097_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 180
    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_123_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_123_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 177
    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_192_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_192_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 180
    }]

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
                                <Img
                                    fluid={product.images[0].localFile.childImageSharp.fluid}
                                    alt={product.title}
                                />
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
                <Container height={'300px'} >
                <Gallery images={productImages} margin={15} enableImageSelection={false}/>
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
