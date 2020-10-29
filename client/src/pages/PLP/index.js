import React from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function PLP(props) {
  const classes = useStyles()

  const { product } = props

  return (
    <Container className={classes.root}>
      <Paper>Products list page!!! => {product}</Paper>
    </Container>
  )
}

export default PLP
