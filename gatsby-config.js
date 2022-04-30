module.exports = {
  siteMetadata: {
    title: `Words in Space`,
    description: `Words in Space is the work of Shannon Mattern.`,
    author: `@shannonmattern`,
    siteUrl: `https://wordsinspace.net/`,
  },
  plugins: [
    {
      resolve: `gatsby-source-wordpress`,
      options: {
        // baseurl: `https://icd.wordsinspace.net/graphql`,
        url: `https://icd.wordsinspace.net/graphql`,
        protocol: `https`,
        schema: {
          // perPage: 50,
          timeout: 300000,
        },
        verboseOutput: true,
        html: {
          useGatsbyImage: true,
          imageQuality: 60,
          imageMaxWidth: 1400,
        },
        develop: {
          nodeUpdateInterval: 10000,
          hardCacheMediaFiles: false,
        },
        production: {
          hardCacheMediaFiles: false,
          allow404images: true,
        },
        excludeFieldNames: [`generalSettings`, `email`, `allSettings`, `generalSettingsEmail`, `viewer`, `pinged`, `toPing`],
        debug: {
          graphql: {
            showQueryOnError: false,
            showQueryVarsOnError: false,
            panicOnError: false,
            writeQueriesToDisk: false,
            // a critical error is a WPGraphQL query that returns an error and no response data. Currently WPGQL will error if we try to access private posts so if this is false it returns a lot of irrelevant errors.
            onlyReportCriticalErrors: false,
          },
        },
        type: {
          RootQuery: {
            excludeFieldNames: [`generalSettings`, `email`, `allSettings`, `generalSettingsEmail`, `viewer`, `pinged`, `toPing`]
          },
          Comment: {
            limit: 0
          },
          Post: {
            excludeFieldNames: [`pinged`, `toPing`],
            limit: process.env.NODE_ENV === `development`
              ? 10
              : null
          },
          Page: {
            excludeFieldNames: [`pinged`, `toPing`],
            limit: process.env.NODE_ENV === `development`
              ? 10
              : null
          },
        }
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/ // See below to configure properly
        },
        failOnError: false
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/work/`],
      },
    },
    {
      resolve: `gatsby-plugin-remove-serviceworker`,
      options: {
        filename: `runtime-service-worker.js`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#fff`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        appElement: '#___gatsby',
        modalProps: { },
      }
    },
    {
      resolve: `gatsby-plugin-netlify-redirect`,
    },
    {
      resolve: "gatsby-plugin-breakpoints",
      options: {
        queries: {
          desktop: '(min-width: 1024px)',
        }
      }
    },
    `gatsby-plugin-netlify`,
    `gatsby-plugin-sitemap`,
  ],
}
