import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser/index'

const AboutOurTeam = () => {
  const [html, setHtml] = useState(null)
  const classes = makeStyles((theme) => ({
    root: {
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
      padding: '20px',
    },
  }))

  useEffect(() => {
    axios.get('/api/pages/about-our-team').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return (
    <>
      <Helmet
        title="Our Team"
        meta={[
          {
            name: 'description',
            content:
              'We are students of DAN.IT Education, FrontEnd course. Year 2020.',
          },
        ]}
      />
      <Container className={classes.root}>{parse(`${html}`)}</Container>
    </>
  )
}

export default AboutOurTeam
