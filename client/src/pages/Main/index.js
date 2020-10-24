import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function Main() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
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
