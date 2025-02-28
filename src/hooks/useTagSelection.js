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
  // const taxArr = slugs.length > 0 ? slugs.map( slug => ({
  //   taxonomy: "TAG",
  //   field: "SLUG",
  //   terms: [slug],
  //   operator: "IN"
  // })) : null;

// const taxQuery = {
//   taxArray: [
//     { field: 'SLUG', terms: ["libraries"], taxonomy: 'TAG' },
//     { field: 'SLUG', terms: ["archives"], taxonomy: 'TAG' }
//   ],
//   relation: 'AND'
// };

// const taxArray = [
//   { field: "SLUG", terms: ["libraries"], taxonomy: "TAG" },
//   { field: "SLUG", terms: ["archives"], taxonomy: "TAG" }
// ];

  const taxArray = slugs.map(slug => ({
      taxonomy: "TAG",
      field: "SLUG",
      terms: [slug]  // Must be an array
    }))

  console.log('taxarr', taxArray)

  // GraphQL query to get the list of Posts and Pages of a selected Tag
  const response = useQuery(SEARCH_TAGS_QUERY, {
    variables: {first: 100, taxArray: taxArray},
    skip: !isTagMode || !taxArray
  })
  console.log(response)
  return response
}