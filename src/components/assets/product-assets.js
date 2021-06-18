import React from 'react'

const overlayStyle = {
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    height: "100%",
    overflow: "hidden",
    position: "absolute",
    width: "100%",
};

const Overlay =  <div style={overlayStyle} />


const ProductImages =
    [
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_b_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_b_thumbnail.jpeg",
            thumbnailWidth: 168,
            thumbnailHeight: 120,
            customOverlay: Overlay
    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_c_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_c_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 120,
            customOverlay: Overlay

    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_097_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_097_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 180,
            customOverlay: Overlay

    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_123_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_123_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 177,
            customOverlay: Overlay

    },
    {
            src: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-photos/21002_d_192_3000px.jpg",
            thumbnail: "https://bucket-of-chum.s3.amazonaws.com/missed-opportunities-thumbnails/21002_d_192_thumbnail.jpeg",
            thumbnailWidth: 120,
            thumbnailHeight: 180,
            customOverlay: Overlay

    }]

export default ProductImages

    