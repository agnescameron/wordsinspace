// 
// HOME
// 
// A function that receives the current breakpoint range (lg, md, sm, xs) as defined in src/hooks/useBreakpoint.js and returns bool variables that control the layouts of the Home
export const getResponsiveHomeVars = (breakpoint) => { 
  return {
    mobileHome:  breakpoint !== 'lg', // this goes into article/ArticleTags.js
  }
}

// 
// BROWSER
// 
// A function that receives the current breakpoint range (lg, md, sm, xs) as defined in src/hooks/useBreakpoint.js and returns bool variables that control the layouts of the Browser
export const getResponsiveBrowserVars = (breakpoint) => { 
  return {
    showDesktopFilters: breakpoint === 'lg', // this goes into the templates/category.js and templates/work.js
    showMobileFilters: breakpoint !== 'lg', // this goes into the templates/category.js and templates/work.js
    showSearch: breakpoint === 'lg', // this goes into the layouts/browser.js
    mobileBrowserLayout : breakpoint !== 'lg', // this goes into the layouts/browser.js
    mobileNavBar : breakpoint !== 'lg',// this goes into the layouts/browser.js
    mobileList: breakpoint !== 'lg', // this goes into components/list.js and components/list/listItem.js
    listWidth: breakpoint !== 'lg' ? '100vw' : '75vw', // this goes into components/list.js and components/list/listItem.js, it controls the width of the List component. The List expands to 100vw since we don't have side Filters on mobile.
    listTitleWidth: breakpoint !== 'lg' ? '95vw' : '45vw', // this goes into components/list.js and components/list/listItem.js, it controls the width of the Title in each ListItem. Titles expand almost fully in mobile, they are constrated at 45vw when not on mobile.
  }
}

// 
// READER
// 
// A function that receives the current breakpoint range (lg, md, sm, xs) as defined in src/hooks/useBreakpoint.js and returns bool variables that control the layouts of the Reader
export const getResponsiveReaderVars = (breakpoint) => { 
  return {
    mobileNavBar : breakpoint !== 'lg', // this goes into the layouts/reader.js
    mobileArticleTags:  breakpoint !== 'lg', // this goes into article/ArticleTags.js
    mobileArticleContent:  breakpoint !== 'lg', // this goes into article/ArticleContent.js
    mobileArticleTitle:  breakpoint !== 'lg', // this goes into article/ArticleContent.js
    mobileArticleFooter:  breakpoint !== 'lg', // this goes into article/ArticleFooter.js
  }
}
