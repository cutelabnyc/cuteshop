import React from "react"
import SEO from "~/components/seo"
import { graphql } from "gatsby"
import {
    Container,
    Wrapper
} from './styles'

export default function Template({
    data,
}) {
    const { markdownRemark } = data
    const { frontmatter, html } = markdownRemark
    return (
        <>
            <SEO title={markdownRemark.frontmatter.title} description={markdownRemark.html} />
            <Container>
                <Wrapper>
                    <h1>{frontmatter.title}</h1>
                    <div
                        className="blog-post-content"
                        dangerouslySetInnerHTML={{ __html: html }}
                    />
                </Wrapper>
            </Container>
        </>
    )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
      }
    }
  }
`