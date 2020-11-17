import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'

import React, { useEffect, useCallback } from 'react'
import { useHistory, useParams } from 'react-router-dom'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useStyles } from './styles'

import {
  toggleFilterCategoryAction,
  setFilterProductsDataAction,
} from '../../../store/filters/filtersAction'
import {
  filterColorsSelector,
  filterPricesIntervalSelector,
  filtersCategoriesSelector,
} from '../../../store/filters/filtersSelectors'
import { createUrlWithManyValues } from '../../../func'
import FormLabel from '@material-ui/core/FormLabel'
import { createPathnameFromFiltersData } from '../utils'

export default function FilterCategoryCheckbox() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const filtersCategories = useSelector(filtersCategoriesSelector)
  const filtersColors = useSelector(filterColorsSelector)
  const [minPrice, maxPrice] = useSelector(filterPricesIntervalSelector)
  const { colors } = useParams()

  const getFilteredData = useCallback(
    (filtersCategories, minPrice, maxPrice, colors, callback) => {
      const linkForProductsInStoreUpdate = createUrlWithManyValues(
        filtersCategories,
        minPrice,
        maxPrice,
        'http://localhost:5000/api/products/filter?categories',
        colors
      )

      axios(linkForProductsInStoreUpdate)
        .then((response) => {
          dispatch(callback(response.data))
        })
        .catch((e) => console.log(e))
    },
    [dispatch]
  )

  useEffect(() => {
    getFilteredData(
      filtersCategories,
      minPrice,
      maxPrice,
      colors,
      setFilterProductsDataAction
    )
  }, [dispatch, minPrice, maxPrice, filtersCategories, getFilteredData, colors])

  const handleChange = (event) => {
    dispatch(toggleFilterCategoryAction(event.target.name))

    getFilteredData(
      filtersCategories,
      minPrice,
      maxPrice,
      colors,
      setFilterProductsDataAction
    )

    createPathnameFromFiltersData(
      history,
      filtersCategories,
      filtersColors,
      minPrice,
      maxPrice
    )
  }

  return (
    <FormGroup row>
      <FormLabel component="legend" className={classes.text}>
        Выбрать категории:
      </FormLabel>
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('guitar')}
            onChange={handleChange}
            name="guitar"
          />
        }
        label="Гитары"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('booster')}
            onChange={handleChange}
            name="booster"
          />
        }
        label="Усилители"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('percussion')}
            onChange={handleChange}
            name="percussion"
          />
        }
        label="Перкуссия"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('bass')}
            onChange={handleChange}
            name="bass"
          />
        }
        label="Басс"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('keybords')}
            onChange={handleChange}
            name="keybords"
          />
        }
        label="Клавиатуры"
      />
      <FormControlLabel
        control={
          <Checkbox
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('accessories')}
            onChange={handleChange}
            name="accessories"
          />
        }
        label="Аксессуары"
      />
    </FormGroup>
  )
}
