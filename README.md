# Words in space

📌 This is the deployed repo for the live version of https://wordsinspace.net/. Ignore all other prior repos. 
It is connected to [a Gatsby Cloud instance](https://www.gatsbyjs.com/dashboard/5a6874ee-d6ce-4893-91d1-b98fd4e79e27/sites/e44fdf3e-30f3-468f-9906-9bdfe99cfaaf/deploys) to monitor WP->Gatsby deploys and is published on Netlify. Both are under `samtous` Github credentials.

The WP dashboard of the website can be accessed at https://icd.wordsinspace.net/wp-login.

## Important Gatsby files 
- `gatsby-node.js` : tell Gatsby how to create pages dynamically (`src/templates/page.js`, `src/templates/post.js`, `src/templates/category.js`)
- `gatsby-config.js` : params of the plugins, particularly `gatsby-source-wordpress-experimental`

### `src/components`
- `List.js`: The list of filterable posts displayed in `src/pages/work.js` and `src/templates/category.js`
- `FiltersContainer.js`, what we call "Index" in our designs (the collapsable tab containing Tags + Categories)
- `SEO.js` just a Gatsby SEO component
- `search.js` 
- `search` folder - search components
- `list` folder - list components
- `article` folder - article components

### `src/components/filters`
The two files for Categories and Tags

### `src/components/navigation`
Our title and Search components

### `src/hooks`
- Some ready-made GraphQL components, in the form of React Hooks so that we can reuse them

### `src/layouts`
- We have three different Layout files `src/layouts/` which set the UI for Home, Browser and Reader

### `src/styles`
Our CSS - I'm styling everything inline so `addedStyles.css` contains some overrides for the Gatsby defaults (in `layout.css`) but overall we shouldn't be adding to these files much

### `src/pages`
- In terms of URLS: `src/pages/index.js` is our Homepage

### `src/images`
Not really using this, maybe if we need some static assets. 

### `src/templates`
Where Gatsby looks when building something dynamically - currently its either a `/{some_category}`, `/{some_page}` , `/{some_post}` or `/work`.


## Responsiveness
- I have created `utils/dom.js` where we are handling the breakpoint logic. For the moment I am simply oscillating between two states (either we are at `lg` viewpoint (=desktop) or not (=mobile). I have already built the logic of moving things around, and hiding what needs to be hidden.

- In the above file, there's one function per Layout (Home, Browser, Reader). They share commonalities but they are independent from each other, to facilitate manipulations. They are called by various files in the codebase, mostly the layouts (`src/layouts/*`) and the templates (`src/templates/*`). 

- Important note for `getResponsiveBrowserVars`: I extracted the width of `List` (the main component in `Browser` view) and `ListTitle` out of these components and into this function - the reason is that we want to be looking at a single file in order to be modifying the designs. 

- The next important file to look at is `src/hooks/useBreakpoint.js` - this is where the breakpoint widths are defined. 

- Under `src/components/mobile/*` we have the components that get sourced when we are in mobile mode.
	- `mobileCategories.js`: The Categories index in a horizontal scroll format <span style="color: #00f ">NEEDS CSS FIXES</span>.
	- `mobileFilters.js`: The mobile version of `Filters.js`, does not include `Tags`.
	- `mobileFooter.js` : self explanatory  <span style="color: #00f ">NEEDS CSS FIXES</span>. 
	- `mobileIndex.js`: This is the mobile version of `index.js` which is the Landing page.
	- `mobileWordsInSpace.js`: The left nav bar in its mobile version (becomes horizontal and moves to the top).
