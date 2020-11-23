import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser/index'
// eslint-disable-next-line
import style from './style.scss'

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

  return <Container className={classes.div}>{parse(`${html}`)}</Container>
}
export default FAQ
