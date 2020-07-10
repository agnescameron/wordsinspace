import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Menu from "../components/menu"

export default function Page({ data }) {
  if(!data) return null
  
  const page = data.allWpPage.nodes[0]

  return (
    <Layout>
      <Menu />
      <div>
        <h1>{page.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query getPages($slug: String!) {
    allWpPage(filter: {slug: { eq: $slug }}) {
      nodes {
        slug
        title
        content
      }
    }
  }
`