import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'
import axios from 'axios'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'html-react-parser'
// eslint-disable-next-line
import style from './style.scss'

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
    axios.get('/api/pages/contacts').then((res) => {
      setHtml(res.data.htmlContent)
    })
  })

  return (
    <>
      <Helmet
        title="Contacts"
        meta={[
          {
            name: 'description',
            content:
              'Pavel Tychyna Avenue, 1v. Phone: +380954355175. Email: danit.soundtower@gmail.com',
          },
        ]}
      />
      <Container className={classes.div}>{parse(`${html}`)}</Container>
    </>
  )
}

export default Contacts
