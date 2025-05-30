import React  from "react"
import PropTypes from "prop-types"
import {useScrollRestoration} from "gatsby"
import Footer from "./footer"
import MobileFooter from "./mobile/mobileFooter"

import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import {getResponsiveBrowserVars} from "../utils/dom"

import Glyph_scrollup from '../images/assets/glyph_scrollup.svg'

import ListItem from "./list/listItem"

const List = ({loading, items, selectTags, clearTags, isTagMode}) => {
  const breakpoints = useBreakpoint()
  const {mobileList, listWidth, listTitleWidth} = getResponsiveBrowserVars(breakpoints)

  console.log('in list selectTags', selectTags)
  const ulScrollRestoration = useScrollRestoration(`list-component-ul-list`)

  function handleScrollTop() {
    if (typeof window === `undefined`) return null
    document.getElementById('list').scrollIntoView()
  }

  return (
    <div className="no-scroll"
      {...ulScrollRestoration}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: mobileList ? 'center' : 'flex-start',
        justifyContent: 'space-between',
        maxHeight: mobileList ?  'calc(100vh - 90px)' : 'calc(100vh - 50px)',
        overflowY: 'auto',
    }}>
        {/* ---------------- LOADING ---------------- */}
        {loading &&
          <ul>
            <div
            style={{
              width: listWidth,
              margin: '0',
            }}
            className='interface'>
              FILTERING TAGS...
            </div>
          </ul>
        }

        {/* ---------------- LIST ---------------- */}
        {!loading &&
          <ul
            style={{
              borderBottom: mobileList ? 'none' : '1px #5B5A7C solid',
              padding: '0px 0px 15px 0px',
              width: mobileList ? '84vw' : 'calc(80vw - 50px)',
              listStyle: 'none',
            }}
            id={mobileList ? 'mobile-list' : 'list'}>
            <button
              style={{
                display: !mobileList ? 'block' : 'none',
                position: 'fixed',
                margin: '0',
                padding: '0',
                right: '20vw',
                top: '50px',
                outline: 'none',
                border: 'none',
                fontSize: '1rem',
                fontWeight: '500',
                color: '#5B5A7C',
                background: 'transparent',
                textTransform: 'uppercase',
                cursor: 'pointer',
                zIndex: '2'
              }}
              onKeyPress={handleScrollTop}
              onClick={handleScrollTop}>
              <Glyph_scrollup id="glyph_scrollup"/>
              <div
                className='metadata'
                style={{
                  writingMode: 'vertical-rl',
                  color: '#FF666E',
                }}>
                BACK TO TOP
              </div>

            </button>

            {items && items.length > 0 ? items.map((item, index) => (
              <ListItem
                key={index}
                item={item}
                mobileList={mobileList}
                isTagMode={isTagMode}
                invertedTheme={false}
                listWidth={listWidth}
                listTitleWidth={listTitleWidth}
                selectTags={selectTags}
                clearTags={clearTags}
                />
            )) : <li>no results found</li> }
          </ul>

        }
        {!mobileList && <Footer />}
        {mobileList && <MobileFooter />}
    </div>
   )
}

List.propTypes = {
  items: PropTypes.array,
}

List.defaultProps = {
  items: [],
}

export default List
