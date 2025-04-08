import { useStaticQuery, graphql } from "gatsby"
import {sortTags} from "../utils/helpers"

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
                categories {
                  nodes {
                    name
                  }
                }
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
                categories {
                  nodes {
                    name
                  }
                }
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