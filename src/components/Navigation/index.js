import React, { useContext } from 'react'
import reduce from 'lodash/reduce'
import PropTypes from 'prop-types'

import StoreContext from '~/context/StoreContext'
import { CartCounter, Container, MenuLink, HeaderTitle, HeaderWrapper, ModuleWrapper } from './styles'

const useQuantity = () => {
  const {
    store: { checkout },
  } = useContext(StoreContext)
  const items = checkout ? checkout.lineItems : []
  const total = reduce(items, (acc, item) => acc + item.quantity, 0)
  return [total !== 0, total]
}

const Navigation = ({ siteTitle }) => {
  const [hasItems, quantity] = useQuantity()

  return (
    <>
      <HeaderWrapper>
        <Container>
          <MenuLink to="/"><HeaderTitle>{siteTitle}</HeaderTitle></MenuLink>
          <MenuLink to="/cart" style={{ fontFamily: "Roboto-Thin ", fontSize: "28px" }}>
            {hasItems && <CartCounter>{quantity}</CartCounter>}
          Cart 🛒
        </MenuLink>
        </Container>
      </HeaderWrapper>
      <ModuleWrapper>
        <Container style={{ padding: "8px" }}>
          <MenuLink to="/">Missed Opportunities</MenuLink>
        </Container>
      </ModuleWrapper>
    </>
  )
}

Navigation.propTypes = {
  siteTitle: PropTypes.string,
}

Navigation.defaultProps = {
  siteTitle: ``,
}

export default Navigation
