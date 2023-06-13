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
    {
        missed_ops:
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

                }
        ],
        messed_up:
        [
                {
                        src: "https://bucket-of-chum.s3.amazonaws.com/messed-up-photos/messedup_0096_star.jpg",
                        thumbnail: "https://bucket-of-chum.s3.amazonaws.com/messed-up-thumbnails/messedup_0096_star_thumb.jpeg",
                        thumbnailWidth: 180,
                        thumbnailHeight: 120,
                        customOverlay: Overlay

                },
                {
                        src: "https://bucket-of-chum.s3.amazonaws.com/messed-up-photos/messedup_0109_star.jpg",
                        thumbnail: "https://bucket-of-chum.s3.amazonaws.com/messed-up-thumbnails/messedup_0109_star_thumb.jpeg",
                        thumbnailWidth: 120,
                        thumbnailHeight: 147,
                        customOverlay: Overlay

                },
                {
                        src: "https://bucket-of-chum.s3.amazonaws.com/messed-up-photos/messedup_0111_star.jpg",
                        thumbnail: "https://bucket-of-chum.s3.amazonaws.com/messed-up-thumbnails/messedup_0111_star_thumb.jpeg",
                        thumbnailWidth: 120,
                        thumbnailHeight: 161,
                        customOverlay: Overlay

                },
                {
                        src: "https://bucket-of-chum.s3.amazonaws.com/messed-up-photos/messedup_plant.png",
                        thumbnail: "https://bucket-of-chum.s3.amazonaws.com/messed-up-thumbnails/messedup_plant_thumb.png",
                        thumbnailWidth: 120,
                        thumbnailHeight: 160,
                        customOverlay: Overlay

                },
                {
                        src: "https://bucket-of-chum.s3.amazonaws.com/messed-up-photos/messedup_snack.png",
                        thumbnail: "https://bucket-of-chum.s3.amazonaws.com/messed-up-thumbnails/messedup_snack_thumb.png",
                        thumbnailWidth: 120,
                        thumbnailHeight: 160,
                        customOverlay: Overlay

                },
        ]
}

export default ProductImages

    