import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function PDP() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Paper>Product details page!!!</Paper>
    </Container>
  )
}

export default PDP
