import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function Basket() {
  const classes = useStyles()

  return (
    <Container className={classes.root}>
      <Paper>Basket!!!</Paper>
    </Container>
  )
}

export default Basket
