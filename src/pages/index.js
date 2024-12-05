import React from 'react'
import {Link} from "gatsby"

import Home from '../layouts/home'
import SEO from '../components/seo'
import HomeItem from '../components/home/homeItem'
import { navigate } from "gatsby"

import MobileIndex from '../components/mobile/mobileIndex'

import {useSiteMenuData} from '../hooks/useSiteMenuData'
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {getResponsiveHomeVars} from "../utils/dom"

import MobileFooter from '../components/mobile/mobileFooter'
import Footer from '../components/footer'

import Sticker_About from '../images/assets/Sticker_About.svg'
import Sticker_About_text from '../images/assets/Sticker_About_text.svg'
import Sticker_Email from '../images/assets/Sticker_Email.svg'
import Sticker_Email_text from '../images/assets/Sticker_Email_text.svg'
import Sticker_Publications from '../images/assets/Sticker_Publications.svg'
import Sticker_Publications_text from '../images/assets/Sticker_Publications_text.svg'
import Sticker_CV from '../images/assets/Sticker_CV.svg'
import Sticker_CV_text from '../images/assets/Sticker_CV_text.svg'
import Sticker_Classes from '../images/assets/Sticker_Classes.svg'
import Sticker_Classes_text from '../images/assets/Sticker_Classes_text.svg'
import Sticker_Projects from '../images/assets/Sticker_Projects.svg'
import Sticker_Projects_text from '../images/assets/Sticker_Projects_text.svg'
import Sticker_Pinboard from '../images/assets/Sticker_Pinboard.svg'
import Sticker_Pinboard_text from '../images/assets/Sticker_Pinboard_text.svg'
import Sticker_Bluesky from '../images/assets/Sticker_Bluesky.svg'
import Sticker_Bluesky_text from '../images/assets/Sticker_Bluesky_text.svg'
import Sticker_Upcoming from '../images/assets/Sticker_Upcoming.svg'
import Sticker_Upcoming_text from '../images/assets/Sticker_Upcoming_text.svg'
import Sticker_RSS from '../images/assets/Sticker_RSS.svg'
import Sticker_RSS_text from '../images/assets/Sticker_RSS_text.svg'

export default function HomePage() {
  const breakpoints = useBreakpoint();
  const { mobileHome } = getResponsiveHomeVars(breakpoints)

  const menuData = useSiteMenuData()

  if (!menuData)  { 
    navigate('/work')
  }

  const menuItems = menuData[0]?.menuItems?.nodes

  if (mobileHome) return <MobileIndex menuItems={menuItems} />

  const styleSVGL = {
    position: 'relative',
    width:'60%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  const styleSVGR = {
    position: 'relative',
    width:'40%',
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  }

  return (
    <Home>
      <SEO
        title='Home'
        description='Words in Space is the work of Shannon Mattern.'
        author='@shannonmattern'
        image='https://raw.githubusercontent.com/samtous/wordsinspace/master/src/images/twittercard.png'
      />
      <div className='home-body'
        style={{
          display: 'flex',
          flexFlow: 'row',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          alignItems: 'stretch',
          alignContent: 'stretch',
          marginRight: '50px',
        }}>
        <div
          style={{
            width: '60%',
          }}>
          <HomeItem item={menuItems[0]} index={1} />
          <HomeItem item={menuItems[1]} index={2} />
        </div>

        <div className="Sticker"
          style={styleSVGR}>
          <Link to={'/classes'}><Sticker_Classes_text id='sticker-classes-text' /><Sticker_Classes id='sticker-classes' /></Link>
        </div>

        <div className="Sticker"
          style={styleSVGL}>
          <Link to={'/publications'}><Sticker_Publications_text id='sticker-publications-text' /><Sticker_Publications id='sticker-publications' /></Link>
        </div>

        <div
          style={{
            width:'40%',
          }}>
          <HomeItem item={menuItems[2]} index={3} />
        </div>

        <div
          style={{
            width:'60%',
          }}>
          <HomeItem item={menuItems[3]} index={4} />
          <HomeItem item={menuItems[4]} index={5} />
        </div>

        <div className="Sticker"
          style={styleSVGR}>
          <Link to ={'/projects'}><Sticker_Projects_text id='sticker-projects-text' /><Sticker_Projects id='sticker-projects' /></Link>
        </div>

        <div className="Sticker"
          style={styleSVGL}>
          <Link to={'/upcoming-events/'}><Sticker_Upcoming_text id='sticker-upcoming-text' /><Sticker_Upcoming id='sticker-upcoming' /></Link>
        </div>

        <div
          style={{
            width:'40%',
          }}>
          <HomeItem item={menuItems[5]} index={6} />
        </div>

        <div
          style={{
            width:'60%',
            display: 'flex',
            flexFlow: 'column',
            flexWrap: 'nowrap',
          }}>

          <HomeItem item={menuItems[6]} index={7} />

        </div>

        <div
          style={{
            width:'60%',
          }}>
          <div className='smallSticker'
            style={{
              marginTop: '5vh',
              display: 'flex',
              flexFlow: 'row',
              alignContent: 'center',
              justifyContent: 'space-between',
              height: '120px',
            }}>
            <a aria-label='about' href="/about/"><Sticker_About_text id='sticker-about-text' /><Sticker_About style={{height: '120%'}} id='sticker-about' /></a>
            <a aria-label='email' href="mailto:scmatter@sas.upenn.edu?subject=Hi Shannon!"><Sticker_Email_text id='sticker-email-text' /><Sticker_Email style={{height: '120%'}} id='sticker-email' /></a>
            <a aria-label='blueSky' href="https://bsky.app/profile/shannonmattern.bsky.social"><Sticker_Bluesky_text id='sticker-twitter-text' /><Sticker_Bluesky style={{height: '120%'}} id='sticker-twitter' /></a>
            <a aria-label='CV' href="https://icd.wordsinspace.net/static_files/matterncv.pdf"><Sticker_CV_text id='sticker-cv-text' /><Sticker_CV style={{height: '120%'}} id='sticker-cv'/></a>
            <a aria-label='pinboard' href="https://pinboard.in/u:shannon_mattern"><Sticker_Pinboard_text id='sticker-pinboard-text' /><Sticker_Pinboard style={{height: '120%'}} id='sticker-pinboard' /></a>
            <a aria-label='RSS' href="https://wordsinspace.net/rss.xml"><Sticker_RSS_text id='sticker-RSS-text' /><Sticker_RSS style={{height: '120%'}} id='sticker-RSS'/></a>
          </div>
        </div>
      </div>
      {/* ----------------------------FOOTER---------------------------- */}
      {!mobileHome && <Footer />}
      {mobileHome && <MobileFooter />}
      <a 
        href="https://wordsinspace.net/"
        style={{
          color: '#F5F5F7',
          fontSize: '1px',
          float: 'left',
        }}>
          Words in Space is the work of Shannon Mattern.
      </a>
    </Home>
  )
}
