import React from "react"
import {Link} from "gatsby"

import HomeImage from "./homeImage"
import HomeCategory from "./homeCategory"

const HomeItem = ({item, index}) => {
  const connectedNode = item?.connectedNode
  const fetchedImage = connectedNode?.node?.featuredImage?.node?.localFile?.childImageSharp
  
  if (!fetchedImage) {
    console.error("could not fetch image",item.toString())
    return
  }

  const thumbnail = fetchedImage?.fluid
  const title = connectedNode?.node?.title
  const category = connectedNode?.node?.categories?.nodes[0]?.name
  const isThree = index%3 === 0
  const leftAligned = (index%3 !== 0) && (index%2 === 0)

  return (
    <div className={isThree ? 'right' : 'left' }
      style={{
        borderBottom: '1.3px solid #7B7BA8',
        marginRight: isThree ? '0' : '10px',
        marginLeft: isThree ? '10px' : '0px',
      }}>

      <div className={leftAligned ? 'imageL' : 'normal'}>

        {/*================ Latest, Category labels and Title ================*/}

        <div className={'home-entry'}>

          <div
            style={{
              display: 'flex',
              flexFlow: 'row wrap',
              margin: '10px 20px 10px 20px',
            }}>

            {/*================ Latest ================*/}
            {connectedNode && <div className='featured'>FEATURED</div>}

            {/*================ Category ================*/}
            {connectedNode && <HomeCategory category={category}/>}

          </div>

          {/*================ Title ================*/}
          <div className={'home-title'}>
            <Link to={item?.url}>{item?.label.replace(/&#038;/, '&')}</Link>
          </div>

        </div>

          {/*================ Thumbnail ================*/}
          {connectedNode && <HomeImage title={title} thumbnail={thumbnail} />}
      </div>
    </div>
  )
}

export default HomeItem
