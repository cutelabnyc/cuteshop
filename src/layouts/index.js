import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import styled from '@emotion/styled'

import ContextProvider from '~/provider/ContextProvider'

import { GlobalStyle } from '~/utils/styles'
import Navigation from '~/components/Navigation'
import Footer from '~/components/Footer'

const Layout = ({ children, }) => {
    return (
        <ContextProvider>
            <GlobalStyle />
            <StaticQuery
                query={graphql`
                    query SiteTitleQuery {
                        site {
                        siteMetadata {
                            title
                        }
                        }
                    }
                    `}
                render={data => (
                    <>
                        <Navigation siteTitle={data.site.siteMetadata.title} />
                        {children}
                        <Footer />
                    </>
                )}
            />
        </ContextProvider>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout
