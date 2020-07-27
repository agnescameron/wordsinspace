import React from "react"
import { graphql } from "gatsby"

import Reader from "../layouts/reader"

export default function pageTemplate({ data }) {
  if(!data) return null

  const {title, date, content} = data.allWpPage.nodes[0]

  return (
    <Reader>
      <div 
        style={{
          width: '70vw',
          margin: '0 auto',
          border: '1px solid'
        }}>
        <div 
          style={{
            fontSize: '4rem',
            lineHeight: '4rem',
            margin: '1vh 0'
          }}>
          {title}
        </div>
        <div 
          style={{
            margin: '1vh 0',
            fontSize: '1rem',
            lineHeight: '1rem',
          }}>
          {date.slice(0,4)}
        </div>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </Reader>
  )
}

export const query = graphql`
  query getPage($uri: String!) {
    allWpPage(filter: {uri: { eq: $uri }}) {
      nodes {
        uri
        title
        content
        date
        uri
        tags {
          nodes {
            uri
          }
        }
      }
    }
  }
`