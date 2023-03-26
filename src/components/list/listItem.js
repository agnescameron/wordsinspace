import React, {useState} from "react"
import {Link} from "gatsby"

import ListTag from "./listTag"
import ListDate from "./listDate"
import ListImage from "./listImage"
import ListCategory from "./listCategory"

const ListItem = ({item, isTagMode, invertedTheme, mobileList, listWidth, listTitleWidth}) => {
  const category=item?.categories?.nodes[0]?.name
  const categoryClass = item?.categories?.nodes[0]?.name.toLowerCase()
  const tags = item?.tags
  const date = item?.date
  const slug = item?.slug

  const [thumbnail, setThumbnail] = useState('')
  const [isVisible, setIsVisible] = useState(false);
  const handleMouseEnter = (e,item) => {
    e.preventDefault()

    const fetchedImage = item?.featuredImage?.node?.localFile?.childImageSharp
    if (!fetchedImage) {
      console.error("could not fetch image", item.toString())
      return
    }
    setIsVisible(true)
    setThumbnail(!isTagMode
                 ? fetchedImage.fluid
                 : item?.featuredImage?.node?.guid
                 )
  }

  const handleMouseLeave = (e) => {
    e.preventDefault()
    setIsVisible(false)
  }

  if (slug === 'about' || slug==='upcoming-events' || slug==='upcoming-events-2') return null

  return (
    <li
      role='button'
      key={item.id}
      className={(categoryClass + "Item" + ' list-item')}
      onMouseEnter={e=>handleMouseEnter(e, item)}
      onMouseLeave={handleMouseLeave}
      style={{
        listStyle: 'none',
          width: listWidth,
          height: 'auto',
          marginRight: '1vw',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'row',
          flexGrow: '1',
          justifyContent: 'space-between',
      }}>

      <div
        style={{
          width: mobileList ? '84vw' : '73vw',
          alignSelf: 'flex-start',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'flex-start',
          borderStyle: 'none none solid none',
          borderWidth: '1.3px',
          borderColor: invertedTheme ? '#fff' : '#7B7BA8',
        }}>

        {/* ==================== Date, Categories, Tags ====================  */}
        <div
          style={{
            paddingLeft: mobileList ? '20px' : '0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
            margin: mobileList ? '10px 0 0 0' :'1.2vh 0 0 8vh',
          }}>
          {date && <ListDate date={date} invertedTheme={invertedTheme} />}
          {category && category !== 'Uncategorized' && <ListCategory category={category.toLowerCase()} />}
          {tags && !mobileList && <ListTag tags={tags} invertedTheme={invertedTheme} />}
        </div>

        {/* ==================== Title ====================  */}
        <div
          style={{
            width: listTitleWidth,
            margin: mobileList ? '15px 0' : '2vh 0 3vh 0',
            paddingLeft: mobileList ? '0' : '30px',
          }}>
          <Link
            to={item.uri}
            className={mobileList ? 'list-title-mobile' : 'list-title'}>
            {item.title}
          </Link>
        </div>

      </div>

      {/* ==================== Thumbnail ====================  */}
      <div
        style={{
          visibility: mobileList ? 'hidden' : 'visible',
          position: 'absolute',
          bottom: '2vw',
          right: '22vw',
          width: '27vw',
          margin: '0',
          padding: '0',
          filter: 'drop-shadow(0px 4.4px 4px rgba(0, 0, 0, 0.25))',
          display: isVisible && !invertedTheme ? 'block' : 'none',
          pointerEvents: 'none',
        }}>
        {thumbnail && <ListImage title={item.title} thumbnail={thumbnail} isTagMode={isTagMode}/>}
      </div>
    </li>
  )
}

export default ListItem
