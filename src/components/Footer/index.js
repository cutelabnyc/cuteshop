import React from 'react'
import { graphql, useStaticQuery } from "gatsby"

import {
    Container,
    MenuLink,
    CuteLabLink,
    FooterContainer,
    Copyright
} from './styles'

const Footer = () => {
    const { allMarkdownRemark } = useStaticQuery(
        graphql`
                query {
                    allMarkdownRemark {
                        edges {
                            node {
                                frontmatter {
                                    title
                                    slug
                                }
                            }
                        }
                    }
                }
            `
    )
    return (
        <FooterContainer>
            <Container>
                {
                    allMarkdownRemark.edges.map((page, key) => {
                        return (
                            <MenuLink to={page.node.frontmatter.slug} key={key}>
                                {page.node.frontmatter.title}
                            </MenuLink>
                        )
                    })
                }
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