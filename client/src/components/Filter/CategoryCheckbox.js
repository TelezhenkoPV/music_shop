import React, { useEffect } from 'react'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useDispatch, useSelector } from 'react-redux'
import {
  toggleFilterCategoryAction,
  toggleFilterCategoryCheckboxAction,
} from '../../store/filters/filtersAction'
import { filtersCategoriesCheckboxesSelector } from '../../store/filters/filtersSelectors'

export default function CategoryCheckbox(props) {
  const { categoryName } = props
  const dispatch = useDispatch()

  const filtersCategoriesCheckboxes = useSelector(
    filtersCategoriesCheckboxesSelector
  )

  if (filtersCategoriesCheckboxes[categoryName] === false) {
    // изменить значение на противоположное
    // setState({...state, [categoryName]: !state[categoryName]})
  }

  useEffect(() => {})

  const handleChange = (event) => {
    dispatch(toggleFilterCategoryCheckboxAction(event.target.name))

    dispatch(toggleFilterCategoryAction(event.target.name))
  }

  return (
    <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.gitars}
            onChange={handleChange}
            name="gitars"
          />
        }
        label="Гитары"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.booster}
            onChange={handleChange}
            name="booster"
            color="primary"
          />
        }
        label="Усилители"
      />
      <FormControlLabel
        control={
          <Checkbox
            onChange={handleChange}
            checked={filtersCategoriesCheckboxes.percussion}
            name="percussion"
          />
        }
        label="Перкуссия"
      />
      <FormControlLabel
        // disabled
        control={
          <Checkbox
            checked={filtersCategoriesCheckboxes.bass}
            icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
            onChange={handleChange}
            name="bass"
          />
        }
        label="Басс"
      />
      <FormControlLabel
        // disabled
        control={
          <Checkbox
            // checked
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
