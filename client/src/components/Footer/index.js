import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '80px',
    width: '100%',
    backgroundColor: theme.palette.primary.main,
  },
}))

function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.root}>
      <Container>
        <Grid container spacing={2} direction={'row'} justify={'center'}>
          <Grid item>
            <Paper elevation={3} component={'div'}>
              point 1
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} component={'div'}>
              point 2
            </Paper>
          </Grid>
          <Grid item>
            <Paper elevation={3} component={'div'}>
              point 3
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </footer>
  )
}

export default Footer
