import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { useDispatch, useSelector } from 'react-redux'
import { getDataForFilterAction } from '../../store/filters/filtersAction'
import { ProductCard } from '../../components/ProductCard/ProductCard'
import CatalogProductBar from '../../components/CatalogProductBar/CatalogProductBar'
import FilterCategoryCheckbox from '../../components/Filter/FilterCategoryCheckbox'
import FilterPriceSlider from '../../components/Filter/FilterPriceSlider'
import { Grid, Typography } from '@material-ui/core'
import guitarHeader from '../../assets/guitar-header.png'
import { getFiltersDataSelector } from '../../store/filters/filtersSelectors'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  filterBlock: {
    width: '30%',
    height: '30%',
    // padding: 30,
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

function PLP(props) {
  const dispatch = useDispatch()
  const classes = useStyles()
  const filtersData = useSelector(getFiltersDataSelector)
  const { product, title, description } = props

  useEffect(() => {
    dispatch(
      getDataForFilterAction({
        categories: product,
      })
    )
  }, [dispatch, product])

  return (
    <div className={classes.root}>
      <div className={classes.pageHeader}>
        <Typography variant={'h4'} style={{ padding: 10 }} align="center">
          {' '}
          {title}
        </Typography>
        <Typography variant={'body2'} style={{ padding: 10 }} align="center">
          {' '}
          Товары/{title}
        </Typography>
      </div>
      <Grid className={classes.mainContainer}>
        <div className={classes.filterBlock}>
          <Paper>
            <FilterCategoryCheckbox categoryName={product} />
            <FilterPriceSlider />
          </Paper>
        </div>
        <div className={classes.productBlock}>
          <Typography variant={'body2'} style={{ padding: 10 }}>
            {description}
          </Typography>
          <CatalogProductBar />
          {filtersData.products &&
            filtersData.products.map((e) => (
              <ProductCard key={e._id} element={e} />
            ))}
        </div>
      </Grid>
    </div>
  )
}

export default PLP
