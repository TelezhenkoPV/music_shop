import React from 'react'
import useStyles from './styles'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

function AdminPanel() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Grid container spacing={2}>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            AdminPanel 1
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            AdminPanel 2
          </Paper>
        </Grid>
        <Grid item>
          <Paper elevation={3} component={'div'}>
            AdminPanel 3
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AdminPanel
