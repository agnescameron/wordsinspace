import { useStaticQuery, graphql } from "gatsby"

export const usePosts = () => {
  const { allWpPost } = useStaticQuery(
    graphql`
      query {
        allWpPost {
          nodes {
            slug
            title
            date
            content
            excerpt
            tags {
              nodes {
                slug
              }
            }
          }
        }
      }
    `
  )
  return allWpPost.nodes
}