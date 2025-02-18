import React from "react"
import { graphql } from "gatsby"

import SEO from "../components/seo"
import Reader from "../layouts/reader"

import ArticleTitle from "../components/article/articleTitle"
import ArticleContent from "../components/article/articleContent"
import ArticleTaxonomy from "../components/article/articleTaxonomy"
import ArticleFooter from '../components/article/articleFooter'

const pageTemplate = ({ data }) => {

  const { title, date, content, categories, tags, slug} = data?.allWpPage?.nodes[0]
  const hiddenTaxonomies = slug === 'about' || slug === 'upcoming-events'

  return (
    <Reader>
      <div>
        {/* ==================== Date, Categories, Tags ====================  */}
        {!hiddenTaxonomies && <ArticleTaxonomy date={date} tags={tags} categories={categories} />}

        {/* ==================== Title ====================  */}
        <ArticleTitle title={title}/>

        {/* ==================== Content ====================  */}
        <ArticleContent content={content} tags={tags} title={title} />

        {/* ----------------------------FOOTER---------------------------- */}
      </div>
      <ArticleFooter />
    </Reader>
  )
}

export const query = graphql `
  query getPage($id: String!) {
    allWpPage(filter: {id: { eq: $id }}) {
      nodes {
        id
        title
        content
        date
        uri
        slug
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
        categories {
          nodes {
            name
          }
        }
        tags {
          nodes {
            slug
            name
            posts {
              nodes {
                title
                slug
                date
                nodeType
                uri
                categories {
                  nodes {
                    name
                  }
                }
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
                categories {
                  nodes {
                    name
                  }
                }
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
    }
  }
`

export const Head = ({ data }) => {
  const fetchedImage = data?.allWpPage?.nodes[0]?.featuredImage?.node?.localFile?.childImageSharp?.fluid ?
    "https://wordsinspace.net" + data?.allWpPage?.nodes[0]?.featuredImage?.node?.localFile?.childImageSharp?.fluid?.src : 
    `https://raw.githubusercontent.com/samtous/wordsinspace/master/src/images/twittercard.png`;

  const { title } = data?.allWpPage?.nodes[0];
  return (
    <>
      <SEO title={title} featuredImage={fetchedImage} />
    </>
  )
}

export default pageTemplate;