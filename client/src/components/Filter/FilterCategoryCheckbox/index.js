import React, { useEffect, useCallback } from 'react'
import axios from 'axios'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleFilterCategoryAction,
  setFilterProductsDataAction,
} from '../../../store/filters/filtersAction'
import {
  filterPricesIntervalSelector,
  filtersCategoriesSelector,
} from '../../../store/filters/filtersSelectors'
import { createUrlWithManyValues } from '../../../func'
import { useHistory } from 'react-router-dom'

export default function FilterCategoryCheckbox() {
  const dispatch = useDispatch()
  const history = useHistory()
  let filtersCategories = useSelector(filtersCategoriesSelector)
  const [minPrice, maxPrice] = useSelector(filterPricesIntervalSelector)

  const getFilteredData = useCallback(
    (filtersCategories, minPrice, maxPrice, callback) => {
      const linkForProductsInStoreUpdate = createUrlWithManyValues(
        filtersCategories,
        minPrice,
        maxPrice
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
      setFilterProductsDataAction
    )
  }, [dispatch, minPrice, maxPrice, filtersCategories, getFilteredData])

  const handleChange = (event) => {
    dispatch(toggleFilterCategoryAction(event.target.name))

    getFilteredData(
      filtersCategories,
      minPrice,
      maxPrice,
      setFilterProductsDataAction
    )

    if (filtersCategories.length === 0) {
      filtersCategories = ['emptyCategory']
    }

    const categoriesPath = filtersCategories.join(',')

    history.push({
      pathname: `/products/${categoriesPath}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
    })
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategories.includes('guitar')}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            onChange={handleChange}
            name="guitar"
          />
        }
        label="Гитары"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategories.includes('booster')}
            onChange={handleChange}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            name="booster"
          />
        }
        label="Усилители"
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategories.includes('percussion')}
            name="percussion"
          />
        }
        label="Перкуссия"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategories.includes('bass')}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
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
            name="accessories"
            checked={filtersCategories.includes('accessories')}
            onChange={handleChange}
          />
        }
        label="Аксессуары"
      />
    </FormGroup>
  )
}
