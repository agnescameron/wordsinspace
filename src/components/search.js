import React, {useState, useEffect, useRef} from "react"
import {useLocation} from '@reach/router'
import { gql, useQuery } from '@apollo/client'

import {sortByDate, extractSearchResults} from '../utils'
import SearchModal from "./search/searchModal"
import SearchResults from "./search/searchResults"

import Glyph from '../images/assets/glyph.svg'
import GlyphHover from '../images/assets/glyph_hover.svg'

// The GraphQL query containing the search term, will be sent to Apollo
const SEARCH_QUERY = gql`
  query SearchQuery($first: Int, $searchTerm: String!, $catName: String!) {
    categories(where: {nameLike: $catName}) {
      nodes {
        name
        posts(first: $first, where: {search: $searchTerm}) {
          nodes {
            title
            slug
            date
            excerpt
            uri
            categories {
              nodes {
                name
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
        pages(first: $first, where: {search: $searchTerm}) {
          nodes {
            title
            slug
            date
            uri
            categories {
              nodes {
                name
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
    }
  }
`

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState([])
  const inputEl = useRef(null)
  const location = useLocation();
  const catName = location.pathname.replace('/', '').replace('/', '') !== 'work' ? location.pathname.replace('/', '').replace('/', '') : ''
  const [isGlyphHovered, setGlyphHovered] = useState(false)
  
  const {loading, error, data} = useQuery(SEARCH_QUERY, {
      variables: { searchTerm: searchTerm, first: 150, catName: catName},
      skip: !showResults
    })

  useEffect(()=>{
    if (showResults && !loading) { 
      setSearchResults(sortByDate(extractSearchResults(data)))
    }
  },[data])

  function handleSubmit(e) {
    e.preventDefault()
    setShowResults(() => (searchTerm.length > 0 ? true : false))
    inputEl.current.value=''
  }

  function onChange(e) {
    e.preventDefault();
    setSearchTerm(inputEl.current.value)
  }

  function closeModal(e) {
    e.preventDefault();
    setShowResults(false)
    setSearchTerm('')
    inputEl.current.value=''
  }

  return (
    <div 
      style={{
        marginRight: '270px',
        marginTop: '15px',
      }}>
      <form 
        style={{
          margin: '0',
          padding: '0'
        }} 
        onSubmit={e => handleSubmit(e)}>

        <div 
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyItems: 'stretch'
          }}>
        <input
          onMouseEnter={e=>setGlyphHovered(true)}
          onMouseLeave={e=>setGlyphHovered(false)}
          style={{
            width: '8vw',
            margin: '0',
            padding: '0',
            border: 'none'
          }} 
          ref={inputEl}
          type="text"
          placeholder="SEARCH"
          className='interface'
          onChange={e => onChange(e)}
          />

         <div
            onMouseEnter={e=>setGlyphHovered(true)}
            onMouseLeave={e=>setGlyphHovered(false)}
          >
           {isGlyphHovered ? <GlyphHover /> : <Glyph />}
         </div>

        </div>
      </form>
      <SearchModal
        isShowing={showResults}
        hide={e=>closeModal(e)}
        searchTerm={searchTerm}
        catName={catName}
        loading={loading}
        searchResults={searchResults}
      />
   </div>
   )
}

export default Search