import React, {useState} from "react"
import {Link} from "gatsby" 
import PropTypes from "prop-types"

import {useTitle} from "../hooks/useTitle"
import Title from "../components/navigation/title"

import "../styles/layout.css"
import "../styles/addedStyles.css"

const Reader = ({children}) => {
  const title = useTitle();
  const [isBrowserHovered, setBrowser] = useState(false);
  const [isTitleHovered, setTitle] = useState(false);
  
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'row nowrap', 
        alignItems: 'flex-start',
        justifyContent: 'space-around',
      }}>

      {/* ----------------------------Left---------------------------- */}
      <div 
        onMouseEnter={e=>setTitle(true)}
        onMouseLeave={e=>setTitle(false)}
        style={{
          border: '1px solid',
          height: '100vh', 
          minWidth: '3vw', 
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
          whiteSpace: 'wrap', 
          textAlign: 'right',
          textTransform: 'uppercase',
          padding: '10px',
          background: !isTitleHovered ? '#fff' : '#ccc',
        }}>
        <Title siteTitle={title} />
      </div>      


      {/* ----------------------------Left---------------------------- */}
      <Link to='/work'>
        <div 
          onMouseEnter={e=>setBrowser(true)}
          onMouseLeave={e=>setBrowser(false)}
          style={{
            border: '1px solid',
            height: '100vh', 
            minWidth: '3vw', 
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
            whiteSpace: 'wrap', 
            textAlign: 'right',
            textTransform: 'uppercase',
            padding: '10px',
            background: !isBrowserHovered ? '#fff' : '#ccc',
          }}>
          Browser
        </div>
      </Link>

      <div 
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between', 
          flexGrow: '1', 
        }}>
        {/* ----------------------------Top---------------------------- */}
        <div 
          style={{
          border: '1px solid',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between', 
          padding: '10px',
          minHeight: '3vw', 
          textTransform: 'uppercase',
        }}>
          <div>Reader</div>
        </div>

        {/* ----------------------------Main---------------------------- */}
        <div 
          style={{
            maxHeight: '95vh',
            padding: '20px 10px',
            overflow: 'scroll',
          }}>
          {children}
        </div>
      </div>
    </div>
  )
}

Reader.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Reader