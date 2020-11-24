import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import React, { useEffect, useState } from 'react'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import { useStyles } from './styles'

import FormLabel from '@material-ui/core/FormLabel'
import { objToQueryString, toggleItemInArr } from '../utils'
import { setFilterActualFiltersParamsAction } from '../../../store/filters/filtersAction'
import {
  actualFiltersSelector,
  actualFiltersCategoriesSelector,
} from '../../../store/filters/filtersSelectors'

export default function FilterCategoryCheckbox() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const actualFilters = useSelector(actualFiltersSelector)
  const actualFiltersCategories = useSelector(actualFiltersCategoriesSelector)

  const [categoriesData, setCategoriesData] = useState([])

  useEffect(() => {
    axios('/api/catalog')
      .then((resp) => {
        const arr = resp.data.map((elem) => [elem.name, elem.id])
        setCategoriesData(arr)
      })
      .catch((e) => console.log(e))
  }, [])

  const handleChange = (event) => {
    const newActualFilters = toggleItemInArr(
      event.target.name,
      'categories',
      actualFilters
    )
    dispatch(setFilterActualFiltersParamsAction(newActualFilters))

    const queryString = objToQueryString(newActualFilters, '/products/&')
    history.push(queryString)
  }

  const list = categoriesData.map(([name, id]) => (
    <FormControlLabel
      className={classes.columns}
      key={id}
      control={
        <Checkbox
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
          checked={actualFiltersCategories.includes(id)}
          onChange={handleChange}
          name={id}
        />
      }
      label={name}
    />
  ))

  return (
    <FormGroup row>
      <FormLabel component="legend" className={classes.text}>
        Select categories:
      </FormLabel>
      {list}
    </FormGroup>
  )
}
