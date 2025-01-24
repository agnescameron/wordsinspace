import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"

import {useTags} from "../hooks/useTags"
import {useTagSelection} from "../hooks/useTagSelection"
import {sortByDate} from "../utils/helpers"

import {getResponsiveBrowserVars} from "../utils/dom"
import { useBreakpoint } from 'gatsby-plugin-breakpoints';

import Browser from "../layouts/browser"
import SEO from "../components/seo"
import Filters from "../components/filters"
import MobileFilters from "../components/mobile/mobileFilters"
import List from "../components/list"

export default function TagTemplate({data}) {
  console.log('in tag template')
  const breakpoints = useBreakpoint()
  const {showDesktopFilters, showMobileFilters} = getResponsiveBrowserVars(breakpoints)

  // initialize the items to all of the Pages and all of the Posts
  const initial = sortByDate([...data.allWpPage.nodes, ...data.allWpPost.nodes]).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
  const [isTagMode, setTagMode] = useState(false)

  // initialize the tags to only those that belong to data of this category, see function definition below for more details
  const [tags, setTags] = useState(useTags())

  // handles clicking on Tags by updating the 'checked' key-value for every tag
  function handleSelection(e) {
    const { name } = e.target;
    setTags(tags.map(tag => tag.name.replace(/[\n\s]/, '-') === name.replace(/[\n\s]/, '-') ? {...tag, checked: !tag.checked } : tag))
  }

  // handles clearing the Tag selections and toggling TagMode
  function handleClear(e) {
    e.preventDefault()
    setTags(tags.map(tag=> ({...tag, checked: false})))
    setTagMode(false)
  }

  // watches tags array for updates and updates the Tag Mode in case no Tag is checked
  useEffect(()=> {
    setTagMode(tags.filter(tag=>tag.checked).length > 0)
  }, [tags])

  // ========== //
  // Apollo query
  // ========== //

  // Apollo useQuery (imported as a hook) fetches Posts and Pages of selected Tags array
  const response = useTagSelection(tags.filter(tag=> tag.checked), isTagMode);
  const tagQueryResults = isTagMode && !response.loading
                          ? sortByDate([...response?.data?.posts?.nodes, ...response?.data?.pages?.nodes]).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
                          : []

  //cant do this as page can have multi cat                          
  const tag = data?.allWpPage?.nodes[0]?.tags?.nodes[0]?.name

  return (
    <Browser>
      <SEO title={tag} />
      {showMobileFilters &&
        <MobileFilters />
      }
      <List
        items={isTagMode ? tagQueryResults : initial} loading={response.loading}
        isTagMode={isTagMode}/>
      {showDesktopFilters &&
        <Filters
          tags={tags}
          selectTags={handleSelection}
          clearTags={handleClear}
          isTagMode={isTagMode} />
      }
    </Browser>
  )
}

// this is a static GraphQL query Gatsby executes when compiling so that we can have access to the different /category endpoints
export const query = graphql`
  query getTag($slug: String!) {
    allWpPage(
      sort: {date: DESC}
      filter: {tags: {nodes: {elemMatch: {slug: {eq: $slug}}}}}
    ) 
    {
      nodes {
        slug
        title
        date
        content
        uri
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
            id
          }
        }
      }
    }
    allWpPost(
      sort: {date: DESC}
      filter: {tags: {nodes: {elemMatch: {slug: {eq: $slug}}}}}
    ) {
      nodes {
        slug
        title
        date
        content
        uri
        excerpt
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
        tags {
          nodes {
            slug
            name
            id
          }
        }
      }
    }
    }

`
