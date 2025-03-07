import { gql, useQuery } from '@apollo/client'

// A GraphQL query looking up Posts and Pages which contain a given Tag
const SEARCH_TAGS_QUERY = gql`
  query SearchTagsQuery($first: Int!, $taxArray: [TaxArray]) {
     pages(
      first: $first
      where: {taxQuery: {taxArray: $taxArray, relation: AND}}
    ){
      nodes {
        id
        slug
        title
        date
        uri
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            guid
          }
        }
        tags {
          nodes {
            id
            slug
            name
          }
        }
      }
    }
    posts(
    first: $first
     where: {taxQuery: {taxArray: $taxArray, relation: AND}}
  ) {
      nodes {
        id
        slug
        title
        date
        excerpt
        uri
        categories {
          nodes {
            name
          }
        }
        featuredImage {
          node {
            guid
          }
        }
        tags {
          nodes {
            id
            slug
            name
          }
        }
      }
    }
  }
`
// we are using the Apollo useQuery hook in order to query the Apollo GraphQL layer using variables (the array of tags' slugs in this case)
export const useTagSelection = (tags, isTagMode) => {

  // extract slugs from the tags that are set to 'checked: true'
  const slugs = tags.map(d => d.slug)

  // use wordpress taxonomy array
  const taxArray = slugs.map(slug => ({
      taxonomy: "TAG",
      field: "SLUG",
      terms: [slug]  // Must be an array
    }))

  // GraphQL query to get the list of Posts and Pages of a selected Tag
  const response = useQuery(SEARCH_TAGS_QUERY, {
    variables: {first: 100, taxArray: taxArray},
    skip: !isTagMode || !taxArray
  })
  return response
}