import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getDataForFilterAction } from '../../store/filters/filtersAction'
import { getFiltersDataSelector } from '../../store/filters/filtersSelectors'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function PLP(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filtersData = useSelector(getFiltersDataSelector)
  const { product } = props

  useEffect(() => {
    if (filtersData.length === 0) {
      dispatch(
        getDataForFilterAction({
          categories: 'gitar',
        })
      )
    }
  }, [dispatch, filtersData.length])

  return (
    <Container className={classes.root}>
      <Paper>Products list page!!! => {product}</Paper>
    </Container>
  )
}

export default PLP
