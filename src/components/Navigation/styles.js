import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const HeaderWrapper = styled.div`
  background: white;
  border-bottom: 3px solid purple;
`

export const ModuleWrapper = styled.div`
  background: white;
  margin-bottom: 1.45rem;
  border-bottom: 3px solid purple;
`

export const HeaderTitle = styled.div`
  font-family: 'PressStart2P';
  color: purple;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 auto;
  max-width: 848px;
  padding-top: 43px;
  padding-bottom: 18px;
`

export const MenuLink = styled(Link)`
  color: purple;
  text-decoration: none;
  font-size: 24px;
  font-family: "Roboto";

  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

export const CartCounter = styled.span`
  background-color: white;
  color: #663399;
  border-radius: 20px;
  padding: 0 10px;
  font-size: 1.2rem;
  float: right;
  margin: -10px;
  z-index: 20;
`
