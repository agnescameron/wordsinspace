const path = require(`path`)
const { generateRSS } = require(`./rss-gen`)

exports.createPages = async ({ actions, graphql }) => {

  const { createRedirect } = actions

  //redirect rules go from most to least specific

  //specific pdf redirects as netlify doesn't support regex, and there are 2 kinds of things that exist under /publications
  createRedirect({ fromPath: '/publications/DissAbstract.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/DissAbstract.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '"/publications/IESS Media Entry 2.pdf"', toPath: '"https://icd.wordsinspace.net/wp-content/uploads/publications/IESS Media Entry 2.pdf"', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/JAEPrintEd.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/JAEPrintEd.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/KirkbrideMatternChainbuilding.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/KirkbrideMatternChainbuilding.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/MakingSpaces.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/MakingSpaces.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/Mattern_EdgeBlendingIAC.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/Mattern_EdgeBlendingIAC.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '"/publications/Mattern_Senses and Society.pdf"', toPath: '"https://icd.wordsinspace.net/wp-content/uploads/publications/Mattern_Senses and Society.pdf"', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '"/publications/Mattern_Silent Invisible City_DRAFT.pdf"', toPath: '"https://icd.wordsinspace.net/wp-content/uploads/publications/Mattern_Silent Invisible City_DRAFT.pdf"', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/MatternPneumaticTubesDraft.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/MatternPneumaticTubesDraft.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/MatternPublicCulture.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/MatternPublicCulture.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/MatternSalmon_FramingNoise.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/MatternSalmon_FramingNoise.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/MatternWoodberryDraft.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/MatternWoodberryDraft.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/NewRepublic.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/NewRepublic.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/NotesListsCFP.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/NotesListsCFP.pdf', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/publications/SilentInvisibleCity.pdf', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/publications/SilentInvisibleCity.pdf', isPermanent: true, force: true, statusCode: 301 })

  //pages that previously had parents
  createRedirect({ fromPath: '/publications/*', toPath: '/:splat', isPermanent: true, force: true, statusCode: 301, queryString: true })
  createRedirect({ fromPath: '/presentations/*', toPath: '/:splat', isPermanent: true, force: true, statusCode: 301, queryString: true })
  createRedirect({ fromPath: '/projects/*', toPath: '/:splat', isPermanent: true, force: true, statusCode: 301, queryString: true })
  createRedirect({ fromPath: '/teaching/*', toPath: '/:splat', isPermanent: true, force: true, statusCode: 301, queryString: true })
  createRedirect({ fromPath: '/blog/*', toPath: '/:splat', isPermanent: true, force: true, statusCode: 301, queryString: true })

  //teaching to classes
  createRedirect({ fromPath: '/teaching/', toPath: '/classes/', isPermanent: true, force: true, statusCode: 301 })

  //archives and random folders from her site
  createRedirect({ fromPath: '/shannon-archive-2017/wp-content/uploads/:year/:month/:slug', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/:year/:month/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/secure/*', toPath: 'https://icd.wordsinspace.net/secure/:splat', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/UMSReadings/*', toPath: 'https://icd.wordsinspace.net/classes-archive/UMSReadings/:splat', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/course_material/*', toPath: 'https://icd.wordsinspace.net/course_material/:splat', isPermanent: true, force: true, statusCode: 301 })

  //archived classes
  createRedirect({ fromPath: '/interfaces/:date', toPath: 'https://interfaces.wordsinspace.net/:date'})
  createRedirect({ fromPath: '/interfaces/:date/*', toPath: 'https://interfaces.wordsinspace.net/:date/:splat'})

  createRedirect({ fromPath: '/data_archive/fall2018', toPath: 'https://dataarchive.wordsinspace.net/2018'})
  createRedirect({ fromPath: '/data_archive/fall2018/*', toPath: 'https://dataarchive.wordsinspace.net/2018/:splat'})

  createRedirect({ fromPath: '/mapsmedia/fall2018', toPath: 'https://mapsmedia.wordsinspace.net/2018'})
  createRedirect({ fromPath: '/mapsmedia/fall2018/*', toPath: 'https://mapsmedia.wordsinspace.net/2018/:splat'})

  createRedirect({ fromPath: '/urbanintel/spring2018', toPath: 'https://urbanintel.wordsinspace.net/2018'})
  createRedirect({ fromPath: '/urbanintel/spring2018/*', toPath: 'https://urbanintel.wordsinspace.net/2018/:splat'})

  createRedirect({ fromPath: '/designingmethods/spring2018', toPath: 'https://designmethod.wordsinspace.net/2018'})
  createRedirect({ fromPath: '/designingmethods/spring2018/*', toPath: 'https://designmethod.wordsinspace.net/2018/:splat'})

  createRedirect({ fromPath: '/mapsmedia/fall2017', toPath: 'https://mapsmedia.wordsinspace.net/2017'})
  createRedirect({ fromPath: '/mapsmedia/fall2017/*', toPath: 'https://mapsmedia.wordsinspace.net/2017/:splat'})

  createRedirect({ fromPath: '/data_archive/fall2017', toPath: 'https://dataarchive.wordsinspace.net/2017'})
  createRedirect({ fromPath: '/data_archive/fall2017/*', toPath: 'https://dataarchive.wordsinspace.net/2017/:splat'})

  createRedirect({ fromPath: '/UMS', toPath: 'https://ums.wordsinspace.net/2017'})
  createRedirect({ fromPath: '/UMS/*', toPath: 'https://ums.wordsinspace.net/2017/:splat'})

  createRedirect({ fromPath: '/urbanintel', toPath: 'https://urbanintel.wordsinspace.net/2017'})
  createRedirect({ fromPath: '/urbanintel/*', toPath: 'https://urbanintel.wordsinspace.net/2017/:splat'})

  createRedirect({ fromPath: '/mapsmedia/fall2016', toPath: 'https://mapsmedia.wordsinspace.net/2016'})
  createRedirect({ fromPath: '/mapsmedia/fall2016/*', toPath: 'https://mapsmedia.wordsinspace.net/2016/:splat'})

  createRedirect({ fromPath: '/booksdata/fall2016', toPath: 'https://booksbigdata.wordsinspace.net/2016'})
  createRedirect({ fromPath: '/booksdata/fall2016/*', toPath: 'https://booksbigdata.wordsinspace.net/2016/:splat'})

  createRedirect({ fromPath: '/mapsmedia/fall2015', toPath: 'https://mapsmedia.wordsinspace.net/2015'})
  createRedirect({ fromPath: '/mapsmedia/fall2015/*', toPath: 'https://mapsmedia.wordsinspace.net/2015/:splat'})

  createRedirect({ fromPath: '/lib-arch-data/2014-fall', toPath: 'https://libarchdata.wordsinspace.net/2014'})
  createRedirect({ fromPath: '/lib-arch-data/2014-fall/*', toPath: 'https://libarchdata.wordsinspace.net/2014/:splat'})

  createRedirect({ fromPath: '/sound-space/2014-spring', toPath: 'https://soundspace.wordsinspace.net/2014'})
  createRedirect({ fromPath: '/sound-space/2014-spring/*', toPath: 'https://soundspace.wordsinspace.net/2014/:splat'})

  createRedirect({ fromPath: '/lib-arch-data/2013-fall', toPath: 'https://libarchdata.wordsinspace.net/2013'})
  createRedirect({ fromPath: '/lib-arch-data/2013-fall/*', toPath: 'https://libarchdata.wordsinspace.net/2013/:splat'})

  createRedirect({ fromPath: '/urban-media-archaeology/2013-fall', toPath: 'https://uma.wordsinspace.net/2013'})
  createRedirect({ fromPath: '/urban-media-archaeology/2013-fall/*', toPath: 'https://uma.wordsinspace.net/2013/:splat'})

  createRedirect({ fromPath: '/lib-arch-data/2012-fall', toPath: 'https://libarchdata.wordsinspace.net/2012'})
  createRedirect({ fromPath: '/lib-arch-data/2012-fall/*', toPath: 'https://libarchdata.wordsinspace.net/2012/:splat'})

  createRedirect({ fromPath: '/urban-media-archaeology/2012-fall', toPath: 'https://uma.wordsinspace.net/2012'})
  createRedirect({ fromPath: '/urban-media-archaeology/2012-fall/*', toPath: 'https://uma.wordsinspace.net/2012/:splat'})

  createRedirect({ fromPath: '/media-architecture/2012-spring', toPath: 'https://mediaarch.wordsinspace.net/2012'})
  createRedirect({ fromPath: '/media-architecture/2012-spring/*', toPath: 'https://mediaarch.wordsinspace.net/2012/:splat'})

  createRedirect({ fromPath: '/media-materiality/2012-spring', toPath: 'https://mediamateriality.wordsinspace.net/2012'})
  createRedirect({ fromPath: '/media-materiality/2012-spring/*', toPath: 'https://mediamateriality.wordsinspace.net/2012/:splat'})

  createRedirect({ fromPath: '/urban-media-archaeology/2011-fall', toPath: 'https://uma.wordsinspace.net/2011'})
  createRedirect({ fromPath: '/urban-media-archaeology/2011-fall/*', toPath: 'https://uma.wordsinspace.net/2011/:splat'})

  createRedirect({ fromPath: '/lib-arch-data/wordpress_libarchdata', toPath: 'https://libarchdata.wordsinspace.net/2011'})
  createRedirect({ fromPath: '/lib-arch-data/wordpress_libarchdata/*', toPath: 'https://libarchdata.wordsinspace.net/2011/:splat'})

  createRedirect({ fromPath: '/urban-media-archaeology/2010-fall', toPath: 'https://uma.wordsinspace.net/2010'})
  createRedirect({ fromPath: '/urban-media-archaeology/2010-fall/*', toPath: 'https://uma.wordsinspace.net/2010/:splat'})

  createRedirect({ fromPath: '/2010/Fall/mediamateriality', toPath: 'https://mediamateriality.wordsinspace.net/2010'})
  createRedirect({ fromPath: '/2010/Fall/mediamateriality/*', toPath: 'https://mediamateriality.wordsinspace.net/2010/:splat'})


  //images
  createRedirect({ fromPath: '/shannon/wp-content/uploads/:year/:month/:slug', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/:year/:month/:slug', isPermanent: true, force: true, statusCode: 301 })

  //pages
  createRedirect({ fromPath: '/shannon/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })

  //posts
  createRedirect({ fromPath: '/shannon/:year/:month/:day/:slug', toPath: '/:year/:month/:day/:slug', isPermanent: true, force: true, statusCode: 301 })

  //top level
  createRedirect({ fromPath: '/shannon', toPath: '/', isPermanent: true, force: true, statusCode: 301 })

  // ------------
  // ------------ Create Pages and Posts endpoints
  // ------------
  const {
    data: {
      allWpContentNode: { nodes: contentNodes },
    },
  } = await graphql(`
    query ALL_CONTENT_NODES {
      allWpContentNode(sort: {date: DESC}, filter: {nodeType: {ne: "MediaItem"}}) {
        nodes {
          nodeType
          uri
          id
          slug
        }
      }
    }
  `)

  await Promise.all(
    contentNodes.map(async (node, i) => {
      const { nodeType, uri, id } = node
     console.log(uri)
     
      await actions.createPage({
        component: path.resolve(`./src/templates/${nodeType.toLowerCase()}.js`),
        path: uri,
        context: {
          id,
        },
      })
    })
  )

  // ------------
  // ------------ Create Category endpoints
  // ------------
  const {
    data: { allWpCategory },
  } = await graphql(`
    {
      allWpCategory {
        nodes {
          slug
        }
      }
    }
  `)

  await Promise.all(
    allWpCategory.nodes.map(async (node, index) => {
      console.log('making cat pages', node.slug)
      await actions.createPage({
        component: path.resolve(`./src/templates/category.js`),
        path: node.slug,
        context: {
          slug: node.slug,
        },
      })
    })
  )




  // ------------
  // ------------ Create 'work' endpoint
  // ------------
  await actions.createPage({
    component: path.resolve(`./src/templates/work.js`),
    path: '/work',
  })
}

exports.onPreInit = async () => {
  // https://github.com/gatsbyjs/gatsby/issues/7810#issuecomment-457010663
  generateRSS()
  console.log('generating new RSS file - onPreInit')
}
