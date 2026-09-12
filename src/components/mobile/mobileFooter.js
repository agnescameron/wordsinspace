import React from "react"
import {Link} from "gatsby"

import {mobileFooterStyles} from "../../utils/dom"
import Circle_mobile_footer from '../../images/assets/circle_mobile_footer.svg'

const MobileFooter = () => {

  return (
    <div
    	style={mobileFooterStyles}>

      <div
        style={{
          alignSelf: 'flex-start',
          display: 'flex',
          flexFlow: 'column',
          flexWrap: 'nowrap',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
        }}>
        <div style={{margin: '6px 0'}} className='metadata'>
          <a href="mailto:smattern@metro.org?subject=Hi Shannon!">email me</a>
        </div>

        <div style={{margin: '6px 0'}}  className='metadata'>
          <a href="https://www.are.na/shannon-mattern/index">are.na</a>
        </div>

        <div style={{margin: '6px 0'}}  className='metadata'>
          <a href="https://shannon_mattern.raindrop.page/all-73408421">raindrop</a>
        </div>

        <div style={{margin: '6px 0'}}  className='metadata'>
          <a href="https://wordsinspace.net/shannon/wp-content/uploads/2019/09/matterncv2019.pdf">CV</a>
        </div>

        <div style={{margin: '6px 0'}}  className='metadata'>
          <Link to={'/colophon'}>colophon</Link>
        </div>

        <div style={{margin: '6px 0'}}  className='metadata'>
          <a href="https://wordsinspace.net/rss.xml">RSS</a>
        </div>
      </div>

      <div
        style={{
          alignSelf: 'flex-start',
          maxWidth: '50%',
          display: 'flex',
          flexFlow: 'column',
          flexWrap: 'nowrap',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>

        <Link to={'/about'}><Circle_mobile_footer /></Link>

        <div
          className='metadata'
          style={{
            textAlign: 'right',
            marginTop: '5px',
            alignSelf: 'flex-end'
          }}>
           © Please credit me if you use my work and consult with me before reusing copyrighted work :)
        </div>
      </div>
    </div>
  )
}

export default MobileFooter
