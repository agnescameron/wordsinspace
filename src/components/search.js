import React from "react"
import { searchContext } from '../context/provider';

const Search = () => {

  function handleChange(e, context) {
    e.preventDefault()
    context.updateSearch(e.target.value)
  }

  function handleFocus(e, context) {
    e.preventDefault()
    context.isSearchInfoVisible(true)
  } 

  function handleBlur(e, context) {
    e.preventDefault()
    context.isSearchInfoVisible(false)
  } 

  return (
    <searchContext.Consumer>
      {context => (
        <React.Fragment>
          <input
            type="text"
            placeholder="SEARCH"
            onFocus={e=>handleFocus(e,context)}
            onBlur={e=>handleBlur(e,context)}
            onChange={e=>handleChange(e,context)}
          />
        </React.Fragment>
      )}
    </searchContext.Consumer>
   )
}

export default Search