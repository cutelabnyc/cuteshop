import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import {
    Container,
    MenuLink,
    HeaderTitle,
    HeaderLink,
    HeaderWrapper,
    CollectionWrapper,
} from './styles'

const Navigation = ({ siteTitle }) => {
    const { allShopifyCollection } = useStaticQuery(
        graphql`
                query {
                    allShopifyCollection(sort: { fields: [id], order: DESC }) {
                        edges {
                            node {
                                title
                                handle
                                products {
                                    title
                                    handle
                                }
                            }
                        }
                    }
                }
            `
    )

    return (
        <>
            <Header siteTitle={siteTitle} />
            <CollectionWrapper>
                <Container style={{ padding: "8px" }}>
                    {allShopifyCollection.edges.filter(collection => !collection.node).map((collection, key) => {
                        return (
                            <MenuLink
                                to={`${collection.node.handle}/${collection.node.products[0].handle}`}
                                key={key}
                            >
                                {collection.node.title}
                            </MenuLink>
                        )
                    })}
                </Container>
            </CollectionWrapper>
        </>
    )
}

const Header = ({ siteTitle }) => {

    return (
        <HeaderWrapper>
            <Container>
                <HeaderLink to="/"><HeaderTitle>{siteTitle}</HeaderTitle></HeaderLink>
            </Container>
        </HeaderWrapper>
    )
}

Navigation.propTypes = {
    siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
    siteTitle: ``,
}

export default Navigation
