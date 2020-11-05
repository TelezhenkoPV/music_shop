import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const Contacts = () => {
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
    axios.get('http://localhost:5000/api/pages/contacts').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return <Container className={classes.div}>{ReactHtmlParser(html)}</Container>
}

export default Contacts
