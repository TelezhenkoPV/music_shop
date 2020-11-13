import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { useStyles } from './styles'
import { Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

import {
  setFilterParsedCategoriesAction,
  setFilterPriceIntervalAction,
  getDataForFilterAction,
} from '../../store/filters/filtersAction'
// import { ProductCard } from '../../components/ProductCard/ProductCard'
import CatalogProductBar from '../../components/CatalogProductBar/CatalogProductBar'
import FilterCategoryCheckbox from '../../components/Filter/FilterCategoryCheckbox'
import FilterPriceSlider from '../../components/Filter/FilterPriceSlider'
import { getFiltersDataSelector } from '../../store/filters/filtersSelectors'
import { addProductToBasket } from '../../store/basket/basketAction'
import FilterColorsCheckbox from '../../components/Filter/FilterColorsCheckbox'
import ProductsScroll from '../../components/InfiniteProductsScroll'

function PLP() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filtersData = useSelector(getFiltersDataSelector)
  const { categoryName, minPrice, maxPrice, colors } = useParams()

  useEffect(() => {
    if (colors) {
      dispatch(getDataForFilterAction(categoryName, colors))
    } else {
      dispatch(getDataForFilterAction(categoryName))
    }
    categoryName.split(',').forEach((elem) => {
      dispatch(setFilterParsedCategoriesAction(elem))
    })
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    dispatch(setFilterPriceIntervalAction([+minPrice, +maxPrice]))
  }, [dispatch, minPrice, maxPrice])

  const handleAddProductToBasket = (elem) => {
    dispatch(addProductToBasket(elem))
  }

  return (
    (!!filtersData.products && (
      <div className={classes.root}>
        <div className={classes.pageHeader}>
          <Typography variant={'h4'} style={{ padding: 10 }} align="center" />
          <Typography variant={'body2'} style={{ padding: 10 }} align="center">
            {' '}
          </Typography>
        </div>
        <Grid className={classes.mainContainer}>
          <div className={classes.filterBlock}>
            <Paper className={classes.filterWrapper}>
              <FilterCategoryCheckbox />
              <FilterPriceSlider />
              <FilterColorsCheckbox />
            </Paper>
          </div>
          <div className={classes.productBlock}>
            <Typography variant={'body2'} style={{ padding: 10 }} />
            <CatalogProductBar />
            {filtersData.products && (
              <ProductsScroll onClickAddProduct={handleAddProductToBasket} />
            )}
          </div>
        </Grid>
      </div>
    )) || <div>Nothing to render</div>
  )
}

export default PLP
