import React from "react"

import SEO from "../components/seo"
import Home from "../layouts/home"
import ArticleTitle from "../components/article/articleTitle"
import Sticker_404 from '../images/assets/Sticker_404.svg'

import { useBreakpoint } from 'gatsby-plugin-breakpoints'
import {getResponsiveHomeVars} from "../utils/dom"

export default function  NotFoundPage({data})  {
  const breakpoints = useBreakpoint();
  const {mobile404} = getResponsiveHomeVars(breakpoints)

	const styleWrapper =
	{
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    textAlign: 'center',
    alignItems: mobile404 ? 'center' : 'center',
  }

  const styleSVG =
	{
		marginTop: '5vh'
	}

	return (
	  <Home>
		  <div style={styleWrapper}>
		    <SEO title="Not found" />
		    <ArticleTitle title={'404 NOT FOUND'} />
			  <span style={styleSVG}><Sticker_404 id='sticker-404' /></span>
	    </div>
	  </Home>
	)
}