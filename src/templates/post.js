import React from 'react'
import { graphql } from 'gatsby'

import SEO from "../components/seo"
import Reader from '../layouts/reader'

import ArticleTitle from '../components/article/articleTitle'
import ArticleContent from "../components/article/articleContent"
import ArticleTaxonomy from "../components/article/articleTaxonomy"
import ArticleFooter from '../components/article/articleFooter'

const postTemplate = ({ data }) => {

  const { title, date, content, categories, tags} = data?.allWpPost?.nodes[0]

  return (
    <Reader>
      <div>
        {/* ==================== Date, Categories, Tags ====================  */}
        <ArticleTaxonomy date={date} tags={tags} categories={categories} />

        {/* ==================== Title ====================  */}
        <ArticleTitle title={title} />

        {/* ==================== Content ====================  */}
        <ArticleContent content={content} tags={tags} title={title} />

        {/* ----------------------------FOOTER---------------------------- */}
      </div>
      <ArticleFooter />
    </Reader>
  )
}

export const Head = ({ data }) => {
  console.log('data is', data)
  const { title, date, content, categories, tags, slug} = data?.allWpPost?.nodes[0]
  return (
    <>
      <SEO title={title} />
    </>
  )
}

export const query = graphql`
  query getPost($id: String!) {
    allWpPost(filter: {id: { eq: $id }}) {
      nodes {
        id
        title
        content
        date
        uri
        slug
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

export default postTemplate;
