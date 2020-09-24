const path = require(`path`)

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions


  const { createRedirect } = actions

  //redirect rules go from most to least specific

  //specific pdf redirects as netlify doesn't support regex
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
  createRedirect({ fromPath: '/publications/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/presentations/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/projects/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/teaching/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/blog/:slug', toPath: '/:slug', isPermanent: true, force: true, statusCode: 301 })

  //teaching to classes
  createRedirect({ fromPath: '/teaching/', toPath: '/classes/', isPermanent: true, force: true, statusCode: 301 })

  //archives and random folders from her site
  createRedirect({ fromPath: '/shannon-archive-2017/wp-content/uploads/:year/:month/:slug', toPath: 'https://icd.wordsinspace.net/wp-content/uploads/:year/:month/:slug', isPermanent: true, force: true, statusCode: 301 })
  createRedirect({ fromPath: '/secure/:slug', toPath: 'https://icd.wordsinspace.net/secure/:slug', isPermanent: true, force: true, statusCode: 301 })

  //archived classes
  createRedirect({ fromPath: '/UMS/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/UMS/:date'})
  createRedirect({ fromPath: '/UMS/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/UMS/:date/:slug'})
  createRedirect({ fromPath: '/UMSReadings/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/UMSReadings/:slug'})
  createRedirect({ fromPath: '/mapsmedia/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/mapsmedia/:date'})
  createRedirect({ fromPath: '/mapsmedia/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/mapsmedia/:date/:slug'})
  createRedirect({ fromPath: '/media-architecture/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/media-architecture/:date'})
  createRedirect({ fromPath: '/media-architecture/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/media-architecture/:date/:slug'})
  createRedirect({ fromPath: '/urban-media-archaeology/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/urban-media-archaeology/:date'})
  createRedirect({ fromPath: '/urban-media-archaeology/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/urban-media-archaeology/:date/:slug'})
  createRedirect({ fromPath: '/interfaces/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/interfaces/:date'})
  createRedirect({ fromPath: '/interfaces/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/interfaces/:date/:slug'})
  createRedirect({ fromPath: '/lib-arch-data/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/lib-arch-data/:date'})
  createRedirect({ fromPath: '/lib-arch-data/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/lib-arch-data/:date/:slug'})
  createRedirect({ fromPath: '/sound-space/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/sound-space/:date'})
  createRedirect({ fromPath: '/sound-space/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/sound-space/:date/:slug'})
  createRedirect({ fromPath: '/urbanintel/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/urbanintel/:date'})
  createRedirect({ fromPath: '/urbanintel/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/urbanintel/:date/:slug'})
  createRedirect({ fromPath: '/digital-archives/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/digital-archives/:date'})
  createRedirect({ fromPath: '/digital-archives/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/digital-archives/:date/:slug'})
  createRedirect({ fromPath: '/designingmethods/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/designingmethods/:date'})
  createRedirect({ fromPath: '/designingmethods/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/designingmethods/:date/:slug'})
  createRedirect({ fromPath: '/media-materiality/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/media-materiality/:date'})
  createRedirect({ fromPath: '/media-materiality/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/media-materiality/:date/:slug'})
  createRedirect({ fromPath: '/tools/:date', toPath: 'https://icd.wordsinspace.net/classes-archive/tools/:date'})
  createRedirect({ fromPath: '/tools/:date/:slug', toPath: 'https://icd.wordsinspace.net/classes-archive/tools/:date/:slug'})


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
      allWpContentNode(
        sort: { fields: date, order: DESC }
        filter: { nodeType: { ne: "MediaItem" } }
      ) {
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
