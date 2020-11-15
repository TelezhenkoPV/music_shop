import axios from 'axios'

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { useStyles } from './styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormLabel from '@material-ui/core/FormLabel'

import {
  filterPricesIntervalSelector,
  filtersCategoriesSelector,
  filterColorsSelector,
} from '../../../store/filters/filtersSelectors'
import { toggleFilterColorAction } from '../../../store/filters/filtersAction'
import { createPathnameFromFiltersData } from '../utils'

export default function FilterColorsCheckbox() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const filtersCategories = useSelector(filtersCategoriesSelector)
  const filtersColors = useSelector(filterColorsSelector)
  const [minPrice, maxPrice] = useSelector(filterPricesIntervalSelector)

  const [colors, setColors] = useState([])

  // need all collection of colors only to render checkboxes
  useEffect(() => {
    axios(' http://localhost:5000/api/colors')
      .then((resp) => setColors(resp.data))
      .catch((e) => console.log(e))
  }, [])

  const handleChange = (event) => {
    dispatch(toggleFilterColorAction(event.target.name))

    createPathnameFromFiltersData(
      history,
      filtersCategories,
      filtersColors,
      minPrice,
      maxPrice
    )
  }

  const list = colors.map((elem) => (
    <FormControlLabel
      key={elem._id}
      control={
        <Checkbox
          checked={filtersColors.includes(elem.name)}
          icon={
            <CheckBoxOutlineBlankIcon
              htmlColor={elem.name !== 'white' && elem.name}
              fontSize="small"
            />
          }
          checkedIcon={
            <CheckBoxIcon
              htmlColor={elem.name !== 'white' && elem.name}
              fontSize="small"
            />
          }
          onChange={handleChange}
          name={elem.name}
        />
      }
      label={elem.name}
    />
  ))

  return (
    <FormGroup row>
      <FormLabel component="legend" className={classes.text}>
        Выбрать цвет:
      </FormLabel>
      {list}
    </FormGroup>
  )
}
