import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const AboutOurTeam = () => {
  const [html, setHtml] = useState(null)

  const classes = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
      height: '90%',
      padding: '20px',
    },
  }))

  useEffect(() => {
    axios.get('http://localhost:5000/api/pages/about-our-team').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return <Container className={classes.root}>{ReactHtmlParser(html)}</Container>
}

export default AboutOurTeam
