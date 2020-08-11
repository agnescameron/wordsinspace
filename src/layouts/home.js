import React, {useState} from "react"
import {Link} from "gatsby"
import PropTypes from "prop-types"

import useBreakpoints from '../hooks/useBreakpoint';
import {getResponsiveHomeVars} from "../utils/dom"

import WordsInSpace from '../components/wordsInSpace'
import Footer from '../components/footer'

import MobileWordsInSpace from '../components/mobile/mobileWordsInSpace'
import MobileFooter from '../components/mobile/mobileFooter'

import "../styles/layout.css"
import "../styles/global.css"
import "../styles/home.css"

const Home = ({children}) => {
  
  const breakpoint = useBreakpoints();
  const {mobileHome} = getResponsiveHomeVars(breakpoint)

  const styleWrapper =
  {
    display: 'flex',
    flexDirection: 'row nowrap',
    alignItems: 'flex-start',
    justifyContent: 'space-around',
    height: '100vh',
}

  const styleTopBar =
  {
    display: mobileHome ? 'none' : 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textTransform: 'uppercase',
    height: '60px',
  }

  return (
    <div style={styleWrapper}>
      {/* ----------------------------WORDS IN SPACE---------------------------- */}
      {!mobileHome && <WordsInSpace />}
      {mobileHome && <MobileWordsInSpace />}

      {/* ----------------------------CONTAINER---------------------------- */}
      <div style={{width: '100%'}}>
        {/* ----------------------------TOP---------------------------- */}
        <div className='gradient'>
          <div style={styleTopBar}>
            <div className='interface'>
              HOME
            </div>
          </div>
        </div>

        {/* ----------------------------MAIN---------------------------- */}
        <div 
          style={{
            maxHeight: '92vh',
            overflow: 'auto',
            width: '100%'
          }}>
          {children}
          {!mobileHome && <Footer />}
          {mobileHome && <MobileFooter />}
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Home
