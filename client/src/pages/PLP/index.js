import React from 'react'
import { useDispatch } from 'react-redux'

import { useStyles } from './styles'
import { Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'

import FilterCategoryCheckbox from '../../components/Filter/FilterCategoryCheckbox'
import FilterPriceSlider from '../../components/Filter/FilterPriceSlider'
import { addProductToBasket } from '../../store/basket/basketAction'
import FilterColorsCheckbox from '../../components/Filter/FilterColorsCheckbox'
import ProductsScroll from '../../components/InfiniteProductsScroll'
import FilterBrandsCheckbox from '../../components/Filter/FilterBrandsCheckbox'

function PLP() {
  const dispatch = useDispatch()
  const classes = useStyles()

  const handleAddProductToBasket = (elem) => {
    dispatch(addProductToBasket(elem))
  }

  return (
    (
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
              <FilterBrandsCheckbox />
            </Paper>
          </div>
          <div className={classes.productBlock}>
            <Typography variant={'body2'} style={{ padding: 10 }} />
            <ProductsScroll onClickAddProduct={handleAddProductToBasket} />
          </div>
        </Grid>
      </div>
    ) || <div>Nothing to render</div>
  )
}

export default PLP
