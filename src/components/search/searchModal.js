import React from 'react';
import { render, createPortal } from "react-dom";

import SearchResults from "./searchResults"
import SearchModalText from "./searchModalText"

const SearchModal = ({ isShowing, hide, searchResults, searchTerm, catName, loading}) => isShowing ? createPortal(
  <React.Fragment>
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        zIndex: '1040',
        width: '100vw',
        height: '100vh',
        backgroundColor: '#fff',
        opacity: '0',
      }}
      />
      <div
        role='button'
        tabIndex={0}
        onKeyPress={hide}
        onClick={hide}
        style={{
          position: 'fixed',
          top: '0',
          left: '0',
          zIndex: '1050',
          width: '100%',
          height: '100%',
          overflowX: 'hidden',
          overflowY: 'hidden',
          outline: '0',
        }}>
        <div className="search-modal"
          style={{
            zIndex: '100',
            background: '#513bfd',
            position: 'relative',
            margin: '50px 0 0 50px',
            width: 'calc(80vw - 50px)',
            maxHeight: '75vh',
            padding: '0vh 2vw 0vh 2vw',
            overflowY: 'scroll',
          }}>

          {/* ---------------- LOADING MESSAGE ---------------- */}
          {loading && (
            <div
              className='metadata'
              style={{
                padding: '1vh 0',
                textTransform: 'uppercase',
                color: '#fff'
              }}>
              Searching for <strong>{searchTerm}</strong> {catName === '' ? '' : `under ${catName}`}
            </div>
          )}

          {/* ---------------- SEARCH RESULTS ---------------- */}
          {!loading && (
            <>
              <SearchResults items={searchResults} />
              <SearchModalText resultsCount={searchResults.length} searchTerm={searchTerm} catName={catName} hide={hide} />
            </>
          )}
        </div>
      </div>
  </React.Fragment>, document.body
) : null;

export default SearchModal;
