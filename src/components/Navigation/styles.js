import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const HeaderWrapper = styled.div`
  background: white;
  border-bottom: 1px solid purple;
`

export const CollectionWrapper = styled.div`
  background: white;
  border-bottom: 1px dashed purple;
  a {
    font-family: "Alegreya-Sans"
  }
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
  padding: 20px;
  padding-top: 43px;
  padding-bottom: 18px;
`

export const HeaderLink = styled(Link)`
  color: purple;
  text-decoration: none;
  font-size: 24px;
  font-family: "Alegreya-Sans-Thin";
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

export const MenuLink = styled(Link)`
  color: purple;
  text-decoration: none;
  font-size: 24px;
  font-family: "Alegreya-Sans-Thin";
  padding-left: 8px;
  padding-right: 8px;
  &:hover {
      box-shadow: inset -3px 0px 0px 0px purple, inset 3px 0px 0px 0px purple ;
      transition: 1s;
      animation-timing-function: ease-out;
  }
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
