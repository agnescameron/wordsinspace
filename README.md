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

### Troubleshooting log
*March 2023 - useful posts*
- https://github.com/gatsbyjs/gatsby/discussions/35147#discussioncomment-5324586
- https://github.com/gatsbyjs/gatsby/issues/31031
- https://github.com/gatsbyjs/gatsby/issues/34051
- https://github.com/gatsbyjs/gatsby/issues/36101
- https://github.com/gatsbyjs/gatsby/issues/10347
<details>
<summary>Load this GraphiQL query to compare faulty + functioning posts</summary>
```
[hiding URL since public]/wp-admin/admin.php?page=graphiql-ide&query=I4VwpgTgngBAsgUQCIEkCCB9FAVBcDKAFACQCWAdgFwwDaKSAugJQwDeAUDDALZgAmpAIYoALmG4BnQgDNSECSOoBGAAwqANDADuAC0hhqrGBWplyMAL4sOXLuQD2fMBLadbXQQBsR2MAA8Rdjd3QXIAY2cRe3kZOQVlNWtg9xgHJxcbFPcw%2B3IxPOwoAAcwVyystNLM8pSMDBFisHJBXmSarlI%2BNvKLbvdevtscvKafRoA5FrBBrj5BEUEAI0EJMBQu9pg5sRmt%2BbAAcW5AzfS5fnxPEABzXaawz3sJEAhpzeuQTt2vzdIJAGFcvkRONHG92n9fBBuKCnEFNp4ViIEAIxHwAEKwartSplTa2OoNErNVr42w-fG9TYDBEUADWu24jlIsn4jOZrL4RxO7QkV1umwU8xAEnh7TE3CKiLEeM2Eql%2B0mrV2XEJjRJ4JqNPaL1IYpqauJU315QAdOaYLl4PwhKJxLKIRt2tqaubTZbzAAFQTXKoq4xOrUmrJuj0wT1PEQOmoUoNBwZFH1rcjSezRlJNPj-F4SaK7HQrcb%2BETe335lae14AN1I9hFpc15SFEBE2fkebjKRdtkEIBEOmi6bsYKHBPq6uNv0DXe63Y8fYHECQ8yWKzW0-n-ei626YUERREtfIwe0RX%2BOlInj4ryoMDCF6vN9i8kUMFUKiSNUqGV2w2BhRKUd3FxbFNkNJpJzJAN-SpZ0T2yIFRgAsAlUbLJtlXVYd1OfZdm2Q5jjw5xzj4S4bjucJHmeV5dg%2BWNynorI-kBEY8lhNCUkhSAYTBeDbERBQUVINFMSA2wQP9VVxyNUkoMYnpdjnFJPHpdkBE5NSWVIfhuV2PlyMFBYRBFPiuHlaU-TJczFWNf1wI1RTTJgXUnPs2zNlDK04BtYQJTEjoNxnXZPK9JN-Og6knJC8NI3C%2BT%2BkGJSuETX0UBTNNQIzcgsxzDt2gLCQiwCBtywkSswBrOsyqTPSFhbNtcwgRLZxPHJuF4PJARAPJd3sdrRnwIyTN6-q8ikWQXwSD9R2-MS3NkmNAq4JKYBS5NUzEzMGrymoCqKksas2Arysq%2BtDt5OrW1yprOwS3rWLGQDMuHJw5ukiCFoYpbLBa%2B7-wmSD3Aw5YsMC-Dunw3T0OcMIIFIA8jwh4jXlI-lunuKiXg42RPDAfBSAALw4ujAvk5jELY3imIkKEeLhboBORVF%2BFE57UhHNmpKJD6OPceKfqyJSVPIBlul4ARBCQMAFkvH8ahx3mYD0Uhrh0QJBl4BYxP3SBjJozY914CBBF-fdD1yX97CKKA4dVnkalhsB9j4bBSF4IVJV-FHhN2VM908AAZJprn7b5c12OkwCgLRoj4UVNmibS8nmRHBR0PsxAgfASjZOVhNx5rBgkQnnDEhXfcvPGS-zMAVbVxk3bAZDdgcwU6wgCIAFUIE8XYtE6UP4xqfu%2BEHoKsnF20JW73uJ585uJ8bheUiZdTtMC1etJ0wjui0IpvRvV9E0PmaOcth7kPCiSoJgebFaY76Esi8--pKVC8JXEH1w-nYcLEKH2hnBRmRAU7QMZPCxrRT4j8IoQgBBTEEVM4G03Yk5RmQkRJYn9NfKCd9JKwMis-WkItNIaU2JvTkACaj6VAdQoaopdjWRlJzWwTCULuXxHgohOo4auXeg5YKFovI%2BTtNwOKMCVpcGig2cRjlBHuitBGBQsjCEKUFieY%2BoxlwLC-thFImi8h6PcMXIm8cUg0O6LmF4Xce6WI7vgaWlj6EnjYaONh79BhcPHikQ8IgC5ZBclkLxy03C9AsEAA
```
</details>

**TLDR** 👉 Had to quarantine `post=10069` (is currently private) since one of images (prob thumbnail) was not being fetched properly.
