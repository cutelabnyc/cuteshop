const path = require('path')

require('dotenv').config({
    path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
    siteMetadata: {
        title: `CuteShop`,
        description: `CuteLab's modular synth storefront, very cute!`,
        author: `Max Ardito, Sam Tarakajian`,
        siteUrl: "https://shop.cutelab.nyc",
    },
    flags: {
      FAST_DEV: true,
    },
    plugins: [
        {
            resolve: "gatsby-source-shopify",
            options: {
            password: process.env.SHOPIFY_SHOP_PASSWORD,
            storeUrl: process.env.GATSBY_SHOPIFY_STORE_URL,
            shopifyConnections: ["collections"],
            },
        },
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-remark",
        "gatsby-transformer-sharp",
        "gatsby-plugin-sitemap",
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown`,
                path: `${__dirname}/resources/markdown`,
            },
        },
        `gatsby-plugin-layout`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `CuteShop`,
                short_name: `CuteShop`,
                start_url: `/`,
                background_color: `#663399`,
                theme_color: `#663399`,
                display: `minimal-ui`,
                icon: `static/favicon.ico`, // This path is relative to the root of the site.
            },
        },
        {
            resolve: 'gatsby-plugin-root-import',
            options: {
                '~': path.join(__dirname, 'src/'),
            },
        },
    ].filter(Boolean),
}
