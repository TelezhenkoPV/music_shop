import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { Typography } from '@material-ui/core'
import useStyles from './styles'
import logo from '../../assets/logo-footer.svg'
import axios from 'axios'

function Footer() {
  const classes = useStyles()

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/links')
      .then((links) => {
        console.log(links)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    <footer className={classes.root}>
      <Container className={classes.container}>
        <Grid container spacing={2} direction={'row'} justify={'center'}>
          <Grid item className={classes.box}>
            <Typography className={classes.title} noWrap>
              Sound Tower
            </Typography>
            <img alt="company logo" src={logo} className={classes.logo} />
            <Typography className={classes.logoName} variant="subtitle22">
              Музыкальный интернет-гипермаркет
            </Typography>
          </Grid>
          <Grid item className={classes.box}></Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
