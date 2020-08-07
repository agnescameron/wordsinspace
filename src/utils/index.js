// gets month name from month index
export const getMonthName = (index) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[index-1]
}


// When we first land on a /category endpoint, we want the Tag list to automatically display Tags that are associated with this category's content. We can't do that dynamically with Apollo and we can't use a Gatsby static Query since it doesn't accept variables. We have to construct the [tags] array manually, by extracting them out of the deeply nested 'category' variable. 
export const extractTags = (initial) => {
  return initial
         	.filter(hasTags=>hasTags.tags && hasTags.tags.nodes.length>0) // filter for elements that contain non-zero Tag arrays
         	.map(item=> { 
            // transform the incoming array into an object with 3 key-value pairs => {checked: bool, slug: string, id: string}, which we need for Tag UX
            let item_tags = item.tags.nodes.map(tag => {
                              return {checked: false, slug: tag.slug, name: tag.name, id: tag.id}
                            }) 
            return item_tags
         })
         .flat(2) // flattens the incoming array of arrays (depth=2)
         .filter((v,i,a)=>a.findIndex(t=>(t.id === v.id))===i) // checks for uniqueness based on id, seen here https://stackoverflow.com/a/56757215 
         .sort( (a, b) => a.id.localeCompare(b.id, 'en', {'sensitivity': 'base'})) // sorts the incoming array of objects alphabetically by 'name', seen here https://stackoverflow.com/a/58958381
}

export const sortTags = (tags) => {
   return tags
            .filter(tag => tag.name.length > 0) // filter for nodes which have tags
            .filter(hasTags => hasTags.pages.nodes.length>0 || hasTags.posts.nodes.length>0) // filter for nodes the Posts or Pages nodes have tags
            .sort((a, b) => a.posts.nodes.length + a.pages.nodes.length < b.posts.nodes.length + b.pages.nodes.length ? 1 : -1) // sort DESC by the number of tags across both Posts and Pages
            .map(obj=> ({ ...obj, checked: false })) // modify the incoming array by inserting a {checked: true|false} field to every object, which is used for selecting Tags
}

export const sortByDate = (array) => {
  return array.sort((a,b)=> {
    if (a.date && b.date) {
      return parseInt(b.date.slice(0,4)) - parseInt(a.date.slice(0,4))
    }
  })
}

export const extractSearchResults = (array) => {
  let results = array.categories.nodes
               .filter(cat=> cat.pages.nodes.length >0 || cat.posts.nodes.length >0)
               .map(nonEmptyCat => {
                  return [...nonEmptyCat.pages.nodes, ...nonEmptyCat.posts.nodes]
               })
               .flat(2)
  return results
}

export const getResponsiveVars = (breakpoint) => { 
  return {
    showDesktopFilters: breakpoint === 'lg',
    showMobileFilters: breakpoint !== 'lg',
    showSearch: breakpoint === 'lg',
    mobileBrowserLayout : breakpoint !== 'lg',
    mobileNavBar : breakpoint !== 'lg',
    mobileList: breakpoint !== 'lg',
    listWidth: breakpoint !== 'lg' ? '100vw' : '75vw',
    listTitleWidth: breakpoint !== 'lg' ? '95vw' : '50vw',
  }
}