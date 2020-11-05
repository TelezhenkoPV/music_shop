import React, { useEffect } from 'react'
import axios from 'axios'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleFilterCategoryAction,
  toggleFilterCategoryCheckboxAction,
  setFilterProductsDataAction,
  clearFilterCategoriesCheckboxesAction,
  setFilterCategoryAction,
} from '../../../store/filters/filtersAction'
import {
  filtersCategoriesCheckboxesSelector,
  filtersCategoriesSelector,
} from '../../../store/filters/filtersSelectors'
import { createUrlWithManyValues } from '../../../func'

export default function FilterCategoryCheckbox(props) {
  const { categoryName } = props
  const dispatch = useDispatch()

  const filtersCategoriesCheckboxes = useSelector(
    filtersCategoriesCheckboxesSelector
  )
  const filtersCategories = useSelector(filtersCategoriesSelector)

  useEffect(() => {
    dispatch(clearFilterCategoriesCheckboxesAction())
    dispatch(toggleFilterCategoryCheckboxAction(categoryName))
    dispatch(setFilterCategoryAction(categoryName))
  }, [categoryName, dispatch])

  const handleChange = (event) => {
    dispatch(toggleFilterCategoryCheckboxAction(event.target.name))
    dispatch(toggleFilterCategoryAction(event.target.name))

    const linkForProductsInStoreUpdate = createUrlWithManyValues(
      'http://localhost:5000/api/products/filter',
      'categories',
      filtersCategories
    )

    axios(linkForProductsInStoreUpdate)
      .then((response) => {
        dispatch(setFilterProductsDataAction(response.data))
      })
      .catch((e) => console.log(e))
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.gitar}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            onChange={handleChange}
            name="gitar"
          />
        }
        label="Гитары"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.booster}
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
            checked={filtersCategoriesCheckboxes.percussion}
            name="percussion"
          />
        }
        label="Перкуссия"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.bass}
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
            name="keybords"
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            checkedIcon={<CheckBoxIcon fontSize="small" />}
            checked={filtersCategoriesCheckboxes.keybords}
            onChange={handleChange}
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
            checked={filtersCategoriesCheckboxes.accessories}
            onChange={handleChange}
          />
        }
        label="Аксессуары"
      />
    </FormGroup>
  )
}
