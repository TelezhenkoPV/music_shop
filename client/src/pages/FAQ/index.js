import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser/index'

const FAQ = () => {
  const [html, setHtml] = useState(null)
  const classes = makeStyles((theme) => ({
    div: {
      [theme.breakpoints.down('sm')]: {
        padding: '10px',
      },
      padding: '20px',
    },
  }))

  useEffect(() => {
    axios.get('/api/pages/faq').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return (
    <>
      <Helmet
        title="FAQ"
        meta={[
          {
            name: 'description',
            content: 'How-To. FAQ. Frequently Asked Questions.',
          },
        ]}
      />
      <Container className={classes.div}>{parse(`${html}`)}</Container>
    </>
  )
}
export default FAQ
