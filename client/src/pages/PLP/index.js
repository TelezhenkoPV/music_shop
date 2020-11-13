import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import {
  setFilterParsedCategoriesAction,
  setFilterPriceIntervalAction,
  getDataForFilterAction,
} from '../../store/filters/filtersAction'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import CatalogProductBar from '../../components/CatalogProductBar/CatalogProductBar'
import FilterCategoryCheckbox from '../../components/Filter/FilterCategoryCheckbox'
import FilterPriceSlider from '../../components/Filter/FilterPriceSlider'
import guitarHeader from '../../assets/guitar-header.png'
import { getFiltersDataSelector } from '../../store/filters/filtersSelectors'
import { addProductToBasket } from '../../store/basket/basketAction'
import { useParams } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterBlock: {
    width: '30%',
    height: '30%',
  },
  productBlock: {
    width: '65%',
  },
  mainContainer: {
    width: 1200,
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
  },
  pageHeader: {
    width: '100%',
    backgroundImage: `url(${guitarHeader})`,
    color: '#fff',
    marginBottom: '40px',
  },
}))

function PLP() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filtersData = useSelector(getFiltersDataSelector)
  const { categoryName, minPrice, maxPrice } = useParams()

  useEffect(() => {
    dispatch(getDataForFilterAction(categoryName))
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
          <Typography
            variant={'h4'}
            style={{ padding: 10 }}
            align="center"
          ></Typography>

          <Typography variant={'body2'} style={{ padding: 10 }} align="center">
            {' '}
          </Typography>
        </div>
        <Grid className={classes.mainContainer}>
          <div className={classes.filterBlock}>
            <Paper>
              <FilterCategoryCheckbox />
              <FilterPriceSlider />
            </Paper>
          </div>
          <div className={classes.productBlock}>

            <Typography variant={'body2'} style={{ padding: 10 }}></Typography>

            <CatalogProductBar />
            {filtersData.products &&
              filtersData.products.map((e) => (
                <ProductCard
                  key={e._id}
                  element={e}
                  onClickAddProduct={handleAddProductToBasket}
                />
              ))}
          </div>
        </Grid>
      </div>
    )) || <div>Nothing to render</div>
  )
}

export default PLP
