import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { useDispatch, useSelector } from 'react-redux'
import {
  setFilterPriceIntervalAction,
  setFilterProductsDataAction,
} from '../../../store/filters/filtersAction'
import {
  filterPricesIntervalSelector,
  filterNotFiltredDataSelector,
} from '../../../store/filters/filtersSelectors'

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 200,
    paddingLeft: 5,
    paddingTop: 50,
  },
  text: {
    textAlign: 'center',
  },
})

function valuetext(value) {
  return `${value}$`
}

export default function FilterPriceSlider() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  const pricesInterval = useSelector(filterPricesIntervalSelector)
  const notFiltredData = useSelector(filterNotFiltredDataSelector)

  useEffect(() => {
    const [minPrice, maxPrice] = pricesInterval
    const sortedProductsByPrice = {
      products: [],
      productsQuantity: 0,
    }

    notFiltredData.products.filter((product) => {
      return (
        product.currentPrice >= minPrice &&
        product.currentPrice <= maxPrice &&
        sortedProductsByPrice.products.push(product) &&
        sortedProductsByPrice.productsQuantity++
      )
    })

    dispatch(setFilterProductsDataAction(sortedProductsByPrice))
  }, [pricesInterval, notFiltredData, dispatch])

  const handleChange = (event, newValue) => {
    dispatch(setFilterPriceIntervalAction(newValue))
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" className={classes.text} gutterBottom>
        Цена "от" - "до"
      </Typography>
      <Slider
        min={0}
        max={1500}
        value={pricesInterval}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={10}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  )
}
