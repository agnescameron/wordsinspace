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

// Helper function to check if a tag belongs to a category
const isTagInCategory = (tag, catName) => {
  if (catName === '') return true;
  
  const checkNodes = (nodes) => 
    nodes?.some(item => item.categories?.nodes[0]?.name.toLowerCase() === catName);
  
  return checkNodes(tag.posts?.nodes) || checkNodes(tag.pages?.nodes);
};

// Helper function to get tags that co-occur with ALL selected tags
const getCoOccurringTags = (tags, filterTags, catName) => {
  if (filterTags.length === 0) return [];
  
  // Get co-occurring tags for each filter tag
  const coTagSetsPerFilter = filterTags.map(filterTag => {
    const coTagSlugs = new Set();
    
    tags.forEach(tag => {
      const processNodes = (nodes) => {
        nodes?.forEach(item => {
          const matchesCategory = catName === '' || item.categories?.nodes[0]?.name.toLowerCase() === catName;
          const hasFilterTag = item.tags?.nodes?.some(t => t.slug.toLowerCase() === filterTag.slug.toLowerCase());
          
          if (matchesCategory && hasFilterTag) {
            item.tags?.nodes?.forEach(node => {
              if (node.slug) coTagSlugs.add(node.slug);
            });
          }
        });
      };
      
      processNodes(tag.posts?.nodes);
      processNodes(tag.pages?.nodes);
    });
    
    return coTagSlugs;
  });
  
  // Find intersection of all co-tag sets
  if (coTagSetsPerFilter.length === 1) {
    return Array.from(coTagSetsPerFilter[0]);
  }
  
  // Start with first set and find intersection with all others
  let intersection = coTagSetsPerFilter[0];
  for (let i = 1; i < coTagSetsPerFilter.length; i++) {
    intersection = new Set([...intersection].filter(slug => coTagSetsPerFilter[i].has(slug)));
  }
  
  return Array.from(intersection);
};

// Main function to handle tag filtering and sorting
export const handleTags = (tags, catName = '', pinnedTags = [], tagCutoff = 10) => {
  const checkedTags = tags.filter(tag => tag.checked === true);
  const allTags = [...tags].sort((a, b) => a.name.localeCompare(b.name));
  
  let filteredTags = tags;
  
  // If tags are selected, filter by co-occurring tags
  if (checkedTags.length > 0) {
    const tagsInCategory = catName ? tags.filter(tag => isTagInCategory(tag, catName)) : tags;
    const coOccurringTagSlugs = getCoOccurringTags(tags, checkedTags, catName);
    // Only show tags that are both in the category AND co-occurring
    filteredTags = tagsInCategory.filter(tag => 
      coOccurringTagSlugs.includes(tag.slug.toLowerCase()) || tag.checked === true
    );
  }
  // If no tags selected but category specified, filter by category
  else if (catName) {
    filteredTags = tags.filter(tag => isTagInCategory(tag, catName));
  }
  
  let topTags;
  
  // Handle pinned tags only when no tags are checked and we have pinned tags
  if (checkedTags.length === 0 && pinnedTags.length > 0) {
    const pinned = filteredTags.filter(tag => pinnedTags.includes(tag.name.toLowerCase()));
    const notPinned = filteredTags.filter(tag => !pinnedTags.includes(tag.name.toLowerCase()));
    const remainingSlots = tagCutoff - pinned.length;
    const notPinnedLimit = Math.min(
      remainingSlots,
      filteredTags.length < tagCutoff ? Math.floor(filteredTags.length / 2) : remainingSlots
    );
    
    topTags = [...pinned, ...notPinned.slice(0, notPinnedLimit)];
  } else {
    // For checked tags, return all filtered tags (no cutoff)
    // For no pinned tags scenario, apply cutoff
    if (checkedTags.length > 0) {
      topTags = filteredTags;
    } else {
      const limit = filteredTags.length < tagCutoff 
        ? Math.floor(filteredTags.length / 2) 
        : tagCutoff;
      topTags = filteredTags.slice(0, limit);
    }
  }
  
  return { topTags, allTags };
};