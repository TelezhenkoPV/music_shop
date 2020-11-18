import React, { useState } from 'react'

import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { useStyles } from './styles'
import { objToQueryString, toggleItemInArr } from '../utils'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { actualFiltersSelector } from '../../../store/filters/filtersSelectors'

function valuetext(value) {
  return `${value}$`
}

export default function FilterPriceSlider() {
  const classes = useStyles()
  const history = useHistory()
  const [value, setValue] = useState([0, 1500])
  const actualFilters = useSelector(actualFiltersSelector)

  const handleChange = (event, newValue) => {
    setValue([newValue[0], newValue[1]])

    const newActualFilters = toggleItemInArr(
      newValue[0],
      'minPrice',
      actualFilters
    )

    const superNewActualFilters = toggleItemInArr(
      newValue[1],
      'maxPrice',
      newActualFilters
    )

    const queryString = objToQueryString(superNewActualFilters, '/products/&')
    history.push(queryString)
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" className={classes.text} gutterBottom>
        Price "from {actualFilters.minPrice || value[0]}" - "to{' '}
        {actualFilters.maxPrice || value[1]}"
      </Typography>
      <Slider
        min={0}
        max={1500}
        value={
          [actualFilters.minPrice || 0, actualFilters.maxPrice || 1500] || value
        }
        onChangeCommitted={handleChange}
        valueLabelDisplay="auto"
        step={10}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  )
}
