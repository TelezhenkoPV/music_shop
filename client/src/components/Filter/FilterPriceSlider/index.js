import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { useStyles } from './styles'

import { setFilterPriceIntervalAction } from '../../../store/filters/filtersAction'
import {
  filterColorsSelector,
  filterPricesIntervalSelector,
  filtersCategoriesSelector,
} from '../../../store/filters/filtersSelectors'
import { createPathnameFromFiltersData } from '../utils'

function valuetext(value) {
  return `${value}$`
}

export default function FilterPriceSlider() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const pricesInterval = useSelector(filterPricesIntervalSelector)
  const categoriesName = useSelector(filtersCategoriesSelector)
  const filtersColors = useSelector(filterColorsSelector)
  const [minPrice, maxPrice] = pricesInterval
  const history = useHistory()

  const handleChange = (event, newValue) => {
    createPathnameFromFiltersData(
      history,
      categoriesName,
      filtersColors,
      newValue[0],
      newValue[1]
    )
    dispatch(setFilterPriceIntervalAction(newValue))
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" className={classes.text} gutterBottom>
        Цена "от {minPrice}" - "до {maxPrice}"
      </Typography>
      <Slider
        min={0}
        max={1500}
        value={pricesInterval}
        onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
        step={10}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  )
}
