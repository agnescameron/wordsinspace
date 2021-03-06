import { useStaticQuery, graphql } from "gatsby"
import {sortTags} from "../utils"

export const useTags = () => {
  const { allWpTag } = useStaticQuery(
    graphql`
      query {
        allWpTag {
          nodes {
            name
            id
            slug
            posts {
              nodes {
                title
                slug
                date
                nodeType
                uri
                tags {
                  nodes {
                    slug
                  }
                }
              }
            }
            pages {
              nodes {
                title
                slug
                date
                nodeType
                uri
                tags {
                  nodes {
                    slug
                  }
                }
              }
            }
          }
        }
      }
    `
  )

  const sortedTags = sortTags(allWpTag.nodes)
  return sortedTags 
}