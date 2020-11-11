import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
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
    axios.get('http://localhost:5000/api/pages/faq').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return (
    <Box>
      <Container className={classes.div}>{parse(`${html}`)}</Container>
    </Box>
  )
}
export default FAQ
