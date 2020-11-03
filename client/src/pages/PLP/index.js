import React, { useEffect } from 'react'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import {
  getDataForFilterAction,
  toggleFilterCategoryAction,
  clearFilterCategoriesAction,
} from '../../store/filters/filtersAction'
import { getFiltersDataSelector } from '../../store/filters/filtersSelectors'
import CategoryCheckbox from '../../components/Filter/CategoryCheckbox'

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
    dispatch(clearFilterCategoriesAction())

    dispatch(
      getDataForFilterAction({
        categories: product,
      })
    )

    dispatch(toggleFilterCategoryAction(product))
  }, [dispatch, product, filtersData.length])

  return (
    <>
      <CategoryCheckbox categoryName={product} />
      <Container className={classes.root}>
        {(filtersData.products && filtersData.products.length === 0 && (
          <Paper>Not find</Paper>
        )) || <Paper>Products list page!!! => {product}</Paper>}
      </Container>
    </>
  )
}

export default PLP
