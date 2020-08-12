import React, {useState} from "react"

import Checkbox from './checkbox'
import TagsInfoBox from './tagsInfoBox'

const Tags = ({tags, selectTags, clearTags, isTagMode, clearIndividualTag}) => {
	const [showExtra, setShowExtra] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
	const tagCutoff = 20
	const topTags = tags?.slice(0,tags.length < tagCutoff ? Math.floor(tags.length/2) : tagCutoff)
  const extraTags = tags?.slice(tags.length < tagCutoff ? Math.floor(tags.length/2) : tagCutoff, tags.length)

  return (
   <div
	   	style={{
  	    marginTop: '0px',
	    	textAlign: 'left',
				overflowY: 'scroll',
				overflowX: 'hidden',
				height: '52vh',
				paddingBottom: '0vh'
	    }}>
     	<TagsInfoBox clearTags={clearTags} isTagMode={isTagMode}/>

      {topTags && topTags.map((tag, index) => (
				<Checkbox
		      key={index}
		      label={tag.name}
		      count={tag.pages.nodes.length + tag.posts.nodes.length}
		      isSelected={tag.checked}
		      onCheckboxChange={selectTags}
		      clearIndividualTag={clearIndividualTag}
		    />
     	))}

     	{showExtra && extraTags.map((tag, index) => (
				<Checkbox
		      key={index}
		      label={tag.name}
		      count={tag.pages.nodes.length + tag.posts.nodes.length}
		      isSelected={tag.checked}
		      onCheckboxChange={selectTags}
		      clearIndividualTag={clearIndividualTag}
		    />
     	))}

     	<button
				className='metadata'
	    	style={{
					margin: '0',
					padding: '0',
					border: 'none',
					background: 'transparent',
	        cursor: 'pointer',
	        color: 'red',
	        textDecoration: isHovered ? 'underline' : 'none'
	    	}}
	      onMouseEnter={e=>setIsHovered(true)}
	      onMouseLeave={e=>setIsHovered(false)}
	    	onClick={e=>setShowExtra(!showExtra)}>
	    	{!showExtra ? 'Show extra tags' : 'Hide extra tags'}
	    </button>

   </div>
  )
}

export default Tags
