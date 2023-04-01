import { useStaticQuery, graphql } from "gatsby"

export const useSiteMenuData = () => {
    const { allWpMenu } = useStaticQuery(
      graphql`
        query MenuData {
          allWpMenu {
            nodes {
              menuItems {
                nodes {
                  url
                  label
                  connectedNode {
                    node {
                      ... on WpPage {
                        id
                        title
                        categories {
                          nodes {
                            name
                          }
                        }
                        featuredImage {
                          node {
                            localFile {
                              publicURL
                              childImageSharp {
                                fluid {
                                  ...GatsbyImageSharpFluid
                                }
                              }
                            }
                          }
                        }
                      }
                      ... on WpPost {
                        id
                        title
                        categories {
                          nodes {
                            name
                          }
                        }
                        featuredImage {
                          node {
                            localFile {
                              publicURL
                              childImageSharp {
                                fluid {
                                  ...GatsbyImageSharpFluid
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `
    )
    return allWpMenu.nodes
}