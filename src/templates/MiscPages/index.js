import React from "react"
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
        <Container>
            <Wrapper>
                <h1>{frontmatter.title}</h1>
                <h2>{frontmatter.date}</h2>
                <div
                    className="blog-post-content"
                    dangerouslySetInnerHTML={{ __html: html }}
                />
            </Wrapper>
        </Container>
    )
}
export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`