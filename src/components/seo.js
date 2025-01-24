import React from "react"
import PropTypes from "prop-types"

function SEO({ description, lang, meta, author, title, featuredImage }) {

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:url" content="https://wordsinspace.net/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:card" content="summary" />
      <meta property="og:image" content={featuredImage} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={author} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={featuredImage} />
      <meta name="google-site-verification" content="qgz1o-wWQZm7p2-_tkORHgZtQo1b29E0RSOVNrkJREM" />
      <html lang="en" />
    </>
  )
}


SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: `Words in Space is the work of Shannon Mattern.`,
  featuredImage: `https://raw.githubusercontent.com/samtous/wordsinspace/master/src/images/twittercard.png`,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
  featuredImage: PropTypes.string,
}

export default SEO
