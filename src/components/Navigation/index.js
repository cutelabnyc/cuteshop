import React, { useContext } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'
import StoreContext from '~/context/StoreContext'
import {
    CartCounter,
    Container,
    MenuLink,
    HeaderTitle,
    HeaderLink,
    HeaderWrapper,
    CollectionWrapper,
} from './styles'

const useQuantity = () => {
    const {
        store: { checkout },
    } = useContext(StoreContext)
    const items = checkout ? checkout.lineItems : []
    const total = reduce(items, (acc, item) => acc + item.quantity, 0)
    return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
    const { allShopifyCollection } = useStaticQuery(
        graphql`
            query {
                allShopifyCollection(sort: { id: DESC }) {
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
                <Container style={{ padding: '8px' }}>
                    {allShopifyCollection.edges
                        .filter(collection => !collection.node)
                        .map((collection, key) => {
                            return (
                                <MenuLink
                                    to={`/${collection.node.handle}/${collection.node.products[0].handle}`}
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
    const [hasItems, quantity] = useQuantity()

    return (
        <HeaderWrapper>
            <Container>
                <HeaderLink to="/">
                    <HeaderTitle>{siteTitle}</HeaderTitle>
                </HeaderLink>
                <HeaderLink
                    to="/cart"
                    style={{ fontFamily: 'Alegreya-Sans-Thin', fontSize: '28px' }}
                >
                    Cart 🛒
                    {hasItems && <CartCounter>{quantity}</CartCounter>}
                </HeaderLink>
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
