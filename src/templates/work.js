import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"

import {useTags} from "../hooks/useTags"
import {useTagSelection} from "../hooks/useTagSelection"
import {sortByDate} from "../utils/helpers"

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {getResponsiveBrowserVars} from "../utils/dom"

import Browser from "../layouts/browser"
import SEO from "../components/seo"
import Filters from "../components/filters"
import MobileFilters from "../components/mobile/mobileFilters"
import List from "../components/list"

export default function Work({data}) {
  const breakpoints = useBreakpoint()
  const {showDesktopFilters, showMobileFilters} = getResponsiveBrowserVars(breakpoints)

  // initialize the items to all of the Pages and all of the Posts
  const initial = sortByDate([...data.allWpPage.nodes, ...data.allWpPost.nodes]).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
  const [isTagMode, setTagMode] = useState(false)

  // initialize the tags to all of the Tags available
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

  // ==========
  // Apollo query
  // ==========

  // Apollo useQuery (imported as a hook) fetches Posts and Pages of selected Tags array
  const response = useTagSelection(tags.filter(tag=> tag.checked), isTagMode);
  const tagQueryResults = isTagMode && !response.loading
                          ? sortByDate([...response?.data?.posts?.nodes, ...response?.data?.pages?.nodes]).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
                          : []
  return (
    <Browser>
      <SEO title="Work" />
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
        isTagMode={isTagMode}/>
      }
    </Browser>
	)
}

export const query = graphql`
  query PAGES_POSTS {
    allWpPage(sort: {date: DESC})  {
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
    allWpPost(sort: {date: DESC})  {
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
