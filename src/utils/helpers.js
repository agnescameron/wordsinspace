// gets month name from month index
export const getMonthName = (index) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return monthNames[index-1]
}

function flatten(a) {
    return Array.isArray(a) ? [].concat(...a.map(flatten)) : a;
}

// sorts Tags array when we are in TagMode
export const sortTags = (tags) => {
   return tags
      .filter(tag => tag.name.length > 0) // filter for nodes which have tags
      .filter(hasTags => hasTags.pages.nodes.length > 0 || hasTags.posts.nodes.length > 0) // filter for nodes the Posts or Pages nodes have tags
      .sort((a, b) => a.posts.nodes.length + a.pages.nodes.length < b.posts.nodes.length + b.pages.nodes.length ? 1 : -1) // sort DESC by the number of tags across both Posts and Pages
      .map(obj=> ({ ...obj, checked: false })) // modify the incoming array by inserting a {checked: true | false} field to every object, which is used for selecting Tags
}

// sorts Tags array when we are in TagMode
export const getCoTags = (tags) => {
  const coTagsPosts = tags.map(tag => tag.posts?.nodes?.map(post => post.tags?.nodes.map(node => node.slug)))
  const coTagsPages = tags.map(tag => tag.pages?.nodes?.map(page => page.tags?.nodes.map(node => node.slug)))
  const coTags = [...new Set(flatten(coTagsPosts.concat(coTagsPages)))];
  console.log(coTags)
  return tags;
}

// sorts an array by date (newest to oldest)
export const sortByDate = (array) => {
  return array.sort((a,b)=> {
      return new Date(b.date) - new Date(a.date)
    })
}

// extracts and sorts the search results from what the Apollo useQuery returns
export const extractSearchResults = (array) => {
  let results = array.categories?.nodes
               .filter(cat=> cat.pages.nodes.length >0 || cat.posts.nodes.length >0)
               .map(nonEmptyCat => {
                  return [...nonEmptyCat.pages.nodes, ...nonEmptyCat.posts.nodes]
               })
               .flat(2)
  return sortByDate(results).filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i)
}

// identifies if there are any posts or pages which share the same Tag with the current Post or Page, and if that is the case, returns an array of these items
export const getRelated = (tags, title) => {
  if (!tags || tags.length === 0) return null

  let randomTagSelection = getRandomSubarray(tags?.nodes, 1) // selects two shared tags
  let relatedPages = randomTagSelection?.map(tag => tag.pages ? getRandomSubarray(tag.pages?.nodes, 2) : []).flat(2) // gets Pages that have the Tag
  let relatedPosts = randomTagSelection?.map(tag => tag.posts ? getRandomSubarray(tag.posts?.nodes, 1) : []).flat(2) // gets Posts that have the Tag

  let related = [...relatedPages, ...relatedPosts] // merges array
                .filter((v,i,a)=>a.findIndex(t=>(t.title === v.title))===i) // removes duplicates
                .filter(item => item.title !== title) // removes current Page or Post

  return related
}

// gets random subarray from a given [arr] of [size]
function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

export const handlePublicationsTags = (tags, catName, pinnedTags, tagCutoff) => {
  let topTags = []

  if(tags.filter(tag => tag.checked === true).length > 0) {
      const filterTags = tags.filter(tag => tag.checked === true);
      const tagsInCat = tags.filter(tag => {
          let inCat = false;
          tag.posts?.nodes.forEach(post => {
            if(post.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
          })

          tag.pages?.nodes.forEach(page => {
            if(page.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
          })

          return inCat;
      })

      const coTagsInCat = tags.map(tag => {
          const coPost = tag.posts?.nodes.map(post => {
            if(post.categories?.nodes[0]?.name.toLowerCase() === catName) {
              if(post.tags?.nodes?.filter(tag => tag.slug === filterTags[0].slug.toLowerCase()).length > 0)
                return post.tags?.nodes?.map(node => {if (node.slug !== undefined) return node.slug})
            }
          })

          const coPage = tag.pages?.nodes.map(page => {
            if(page.categories?.nodes[0]?.name.toLowerCase() === catName) {
              if(page.tags?.nodes?.filter(tag => tag.slug === filterTags[0].slug.toLowerCase()).length > 0)
                return page.tags?.nodes?.map(node => {if (node.slug !== undefined) return node.slug})
            }
          })
          return coPost.concat(coPage)
      })

      const coTags = [...new Set(flatten(coTagsInCat))].filter(el => el !== undefined);
      const finalTags = tagsInCat.filter(tag => coTags.includes(tag.slug.toLowerCase()))
      topTags = finalTags;
  }

  // console.log('pinned', pinned, notPinned)
  else {
    const pinned = tags.filter(tag => pinnedTags.includes(tag.name.toLowerCase()))
    let notPinned = tags.filter(tag => !pinnedTags.includes(tag.name.toLowerCase()))

    topTags = [
      // filter by names in pinnedTags to bump these specific tags to top
      ...pinned,
      // rest of tags
      ...notPinned?.slice(0,tags.length < tagCutoff - pinned.length
              ? Math.floor(tags.length/2)
              : tagCutoff  - pinned.length
              )
    ]
  }

    //return alphabetically
    const allTags = [...tags].sort((a,b) => a.name.localeCompare(b.name))

  return {topTags: topTags, allTags: allTags}
}

// in this function we want something that fires if a tag has been selected
// to only return the cotags
export const handleRestOfTags = (tags, catName, tagCutoff) => {
    console.log('catname is', catName)

    if(tags.filter(tag => tag.checked === true).length > 0) {
      const filterTags = tags.filter(tag => tag.checked === true);
      let tagsInCat = tags;

      if(catName !== ''){
        tagsInCat = tags.filter(tag => {
            let inCat = false;
            tag.posts?.nodes.forEach(post => {
              if(post.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
            })

            tag.pages?.nodes.forEach(page => {
              if(page.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
            })

            return inCat;
        })
      }

      const coTagsInCat = tagsInCat.map(tag => {
          const coPost = tag.posts?.nodes.map(post => {
            if(post.categories?.nodes[0]?.name.toLowerCase() === catName || catName === '') {
              if(post.tags?.nodes?.filter(tag => tag.slug.toLowerCase() === filterTags[0].slug.toLowerCase()).length > 0)
                // console.log(post)
                return post.tags?.nodes?.map(node => {if (node.slug !== undefined) return node.slug})
            }
          })

          const coPage = tag.pages?.nodes.map(page => {
            if(page.categories?.nodes[0]?.name.toLowerCase() === catName || catName === '') {
              if(page.tags?.nodes?.filter(tag => tag.slug.toLowerCase() === filterTags[0].slug.toLowerCase()).length > 0)
                // console.log(page)
                return page.tags?.nodes?.map(node => {if (node.slug !== undefined) return node.slug})
            }
          })

          // console.log(coPost, coPage)
          return coPost.concat(coPage)
      })

      const coTags = [...new Set(flatten(coTagsInCat))].filter(el => el !== undefined);
      const finalTags = tagsInCat.filter(tag => coTags.includes(tag.slug.toLowerCase()))
      tags = finalTags;
    }

    else if(catName !== ''){
      tags = tags.filter(tag => {
          let inCat = false;
          tag.posts?.nodes.forEach(post => {
            if(post.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
          })

          tag.pages?.nodes.forEach(page => {
            if(page.categories?.nodes[0]?.name.toLowerCase() === catName) inCat = true
          })

          return inCat;
      })
    }

    const topTags = tags?.slice(0,tags.length < tagCutoff
      ? Math.floor(tags.length/2)
      : tagCutoff)

    //return alphabetically
    const allTags = [...tags].sort((a,b) => a.name.localeCompare(b.name))


  return {topTags: tags, allTags: allTags}
}
