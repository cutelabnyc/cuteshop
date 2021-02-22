import styled from '@emotion/styled'
import { Link } from 'gatsby'
import { breakpoints } from '../../utils/styles'

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 auto;
  border-top: 1px dashed purple;
  padding: 20px;
  padding-top: 18px;
  padding-bottom: 10px;
`

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 0 auto;
  padding: 20px;

`

export const MenuLink = styled(Link)`
  color: purple;
  text-decoration: none;
  font-size: 24px;
  font-family: "Roboto";
  padding-left: 24px;
  padding-right: 24px;
  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

export const CuteLabLink = styled.div`
  color: purple;
  text-decoration: none;
  font-size: 24px;
  font-family: "Roboto-Thin";
  padding-left: 8px;
  padding-right: 8px;
  a {
      color: purple;
      text-decoration: none;
  }
  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`

export const Copyright = styled.div`
  color: purple;
  text-decoration: none;
  font-size: 14px;
  font-family: "Roboto-Thin";
  padding-left: 8px;
  padding-right: 8px;
  @media (max-width: ${breakpoints.s}px) {
    font-size: 1.4rem;
  }
`