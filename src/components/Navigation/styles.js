import styled from '@emotion/styled'
import { Link } from 'gatsby'

import { breakpoints } from '../../utils/styles'

export const HeaderWrapper = styled.div`
    background: white;
    /* border-bottom: 1px solid purple; */
`

export const CollectionWrapper = styled.div`
    background: white;
    border-bottom: 1px dashed purple;
    a {
        font-family: 'Alegreya-Sans';
    }
`

export const HeaderTitle = styled.div`
    font-family: 'PressStart2P';
    color: purple;
`

export const Container = styled.div`
    display: flex;
    justify-content: start;
    align-items: baseline;
    margin: 0 auto;
    max-width: 960px;
    padding: 8px;
    padding-top: 43px;
    padding-bottom: 18px;
`

export const HeaderLink = styled(Link)`
    color: purple;
    text-decoration: none;
    font-size: 24px;
    font-family: 'Alegreya-Sans-Thin';
    padding-left: 8px;
    padding-right: 40px;
    @media (max-width: ${breakpoints.s}px) {
        font-size: 1.4rem;
    }
`

export const MenuLink = styled(Link)`
    color: purple;
    text-decoration: none;
    font-size: 24px;
    font-family: 'Alegreya-Sans-Thin';
    padding-left: 8px;
    padding-right: 8px;
    margin-right: 20px;
    &:hover {
        box-shadow: inset -3px 0px 0px 0px purple, inset 3px 0px 0px 0px purple;
        transition: 1s;
        animation-timing-function: ease-out;
    }
    @media (max-width: ${breakpoints.s}px) {
        font-size: 1.4rem;
    }
`

export const CartCounter = styled.span`
    background-color: purple;
    color: white;
    border-radius: 20px;
    border: 1px solid purple;
    padding: 0 10px;
    font-size: 1.2rem;
    float: right;
    margin: -10px;
    z-index: 40;
`
