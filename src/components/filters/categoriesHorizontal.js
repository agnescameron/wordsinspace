import React from "react"
import {Link} from "gatsby"
import {useCategories} from "../../hooks/useCategories"

const CategoriesHorizontal = ({mobileNavBar, mobileBrowserLayout, catName}) => {
  const categories = useCategories()
  return (
		<div
      style={{
        width: 'calc(-50px + 80vw)',
        display: 'flex',
        flexFlow: 'row nowrap',
        alignItems: 'center',
      }}>
      <div
      	className='interface'
	      style={{
	        margin: mobileNavBar ? '0' : '17px 0px 13px 14px',
	      }}>
        Browsing:
      </div>

      <div
	      style={{
	        display: 'flex',
	        flexFlow: 'row nowrap',
	        alignItems: 'center',
	        width: 'inherit',
	        overflow: 'auto',
	        justifyContent: 'flex-start',
	      }}>
        <div>
          <Link to={'/work'}
            style={{
              position: 'relative',
              margin: '5px'
            }}
            className={!mobileBrowserLayout ? catName === 'work' ? 'work browsetop category-active' : 'work browsetop' : catName.toLowerCase()}
            >
              {mobileBrowserLayout ? catName === 'work' ? `All` : `${catName}` : 'All'}
          </Link>
        </div>

        <div
	        style={{
	          display: 'flex',
	          flexFlow: 'row nowrap',
	          alignItems: 'center',
	          overflow: 'auto',
	          justifyContent: 'flex-end',
	        }}>
          {!mobileBrowserLayout &&
            categories.sort((a,b) => a.name < b.name).map((category,index) => (
              <div key={index}>
                <Link
                  to={`/${category.slug}`}
                  activeClassName='category-active'
                  partiallyActive={true}
                  className={category.slug + " browsetop"}
                  >
                  {category.name}
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    </div>
   )
}

export default CategoriesHorizontal
