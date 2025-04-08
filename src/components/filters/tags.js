import React, {useState} from "react"

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {useLocation} from '@reach/router'

import {getResponsiveBrowserVars} from "../../utils/dom"
import {handlePublicationsTags, handleRestOfTags} from "../../utils/helpers"
import Checkbox from './checkbox'

const Tags = ({tags, selectTags, clearTags, isTagMode}) => {
	const [showExtra, setShowExtra] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
	const tagCutoff = 18

	const location = useLocation()

	const catName = location.pathname.replace('/', '')
                .replace('/', '') !== 'work'
                ? location.pathname.replace('/', '').replace('/', '')
                : ''

	const pinnedTags = ['books', 'articles', 'chapters', 'reviews', 'editorial']

	const {topTags, allTags} = (catName === 'publications')
								? handlePublicationsTags(tags, catName, pinnedTags, tagCutoff)
								: handleRestOfTags(tags, catName, tagCutoff)

	const breakpoints = useBreakpoint()
	const {mobileBrowserLayout} = getResponsiveBrowserVars(breakpoints)
	return (
   <div
	 	className={mobileBrowserLayout ? 'no-scroll' : isTagMode ? 'tag-menu-on no-scroll  tag-right-gradient' : 'tag-menu no-scroll  tag-right-gradient'}
	   	style={{
  	    marginTop: '0px',
	    	textAlign: 'left',
				overflowY: 'scroll',
				overflowX: 'hidden',
				height: isTagMode ? 'calc(-75px + 100vh)' : 'calc(-50px + 100vh)',
				padding: '0 1vw 0 0vh',
				flex: '1 1 auto',
	    }}>

      { showExtra ? 
	      allTags.map((tag, index) => (
					<Checkbox
			      key={index+topTags.length}
			      label={tag.name}
			      count={tag.pages.nodes.length + tag.posts.nodes.length}
			      isSelected={tag.checked}
			      onCheckboxChange={selectTags}
			    />
	     	))
       : topTags.map((tag, index) => (
				<Checkbox
		      key={index}
		      label={tag.name}
		      count={tag.pages.nodes.length + tag.posts.nodes.length}
		      isSelected={tag.checked}
		      onCheckboxChange={selectTags}
		    />
     	))}

     	<button
				className='metadata'
	    	style={{
					margin: '0',
					padding: '0 1vh 3vh 1vh',
					border: 'none',
					background: 'transparent',
	        cursor: 'pointer',
	        color: '#FF666E',
	        textDecoration: isHovered ? 'underline' : 'none'
	    	}}
	      onMouseEnter={e=>setIsHovered(true)}
	      onMouseLeave={e=>setIsHovered(false)}
	      onKeyPress={e=>setShowExtra(!showExtra)}
	    	onClick={e=>setShowExtra(!showExtra)}>
	    	{!showExtra ? 'Show all tags' : 'Hide extra tags'}
	    </button>

   </div>
  )
}

export default Tags
