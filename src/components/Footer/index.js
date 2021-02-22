import React from 'react'
import {
    Container,
    MenuLink,
    CuteLabLink,
    FooterContainer,
    Copyright
} from './styles'

const Footer = () => {
    return (
        <FooterContainer>
            <Container>
                <MenuLink to={'/faq'}>FAQs</MenuLink>
                <MenuLink to={'/contact'}>Contact</MenuLink>
            </Container>
            <Container>
                <CuteLabLink>
                    <a href="http://www.cutelab.nyc">CuteLab NYC</a>
                </CuteLabLink>
                <Copyright>© {new Date().getFullYear()}</Copyright>
            </Container>
        </FooterContainer>
    )
}

export default Footer