import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { getSlides } from '../../store/slides/slidesActions'
import ProductSlides from '../../components/Slides/ProductSlides'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function Main() {
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => dispatch(getSlides()), [dispatch])

  return (
    <Container className={classes.root}>
      <ProductSlides />
      <Grid container spacing={2}>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            main1
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            main2
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            main3
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Main
