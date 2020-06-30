import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"

export default function Post({ data }) {
  const post = data.allWpPost.edges[0]
  return (
    <Layout>
      <div>
        <h1>{post.node.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.node.content }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getPosts($slug: String!) {
    allWpPost(filter: {slug: { eq: $slug }}) {
      edges {
        node {
          slug
          content
        }
      }
    }
  }
`