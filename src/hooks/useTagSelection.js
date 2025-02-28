import { gql, useQuery } from '@apollo/client'

// A GraphQL query looking up Posts and Pages which contain a given Tag
const SEARCH_TAGS_QUERY = gql`
  query SearchTagsQuery($first: Int!) {
     pages(
      first: $first
      where: {taxQuery: {taxArray: [{field: SLUG, terms: "libraries", taxonomy: TAG},{field: SLUG, terms: "archives", taxonomy: TAG},], relation: AND}}
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
     where: {taxQuery: {taxArray: [{field: SLUG, terms: "libraries", taxonomy: TAG},{field: SLUG, terms: "archives", taxonomy: TAG},], relation: AND}}
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
  // const taxQuery = slugs.length > 0 ? {
  //   relation: "AND",
  //   taxArray: slugs.map(slug => ({
  //     taxonomy: "post_tag",
  //     field: "slug",
  //     terms: slug,  // Must be an array
  //     operator: "IN"
  //   }))
  // } : null;

const taxQuery = {
  taxArray: [
    { field: 'SLUG', terms: ["libraries"], taxonomy: 'TAG' },
    { field: 'SLUG', terms: ["archives"], taxonomy: 'TAG' }
  ],
  relation: 'AND'
};

  console.log('taxarr')

  // GraphQL query to get the list of Posts and Pages of a selected Tag
  const response = useQuery(SEARCH_TAGS_QUERY, {
    variables: {first: 100, taxQuery: taxQuery},
    skip: !isTagMode || !taxQuery
  })
  return response
}