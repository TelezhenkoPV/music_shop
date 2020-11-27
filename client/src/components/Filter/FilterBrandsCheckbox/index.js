import axios from 'axios'

import React, { useEffect, useState } from 'react'

import { useStyles } from './styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormLabel from '@material-ui/core/FormLabel'
import { objToQueryString, toggleItemInArr } from '../utils'
import { useHistory } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { actualFiltersSelector } from '../../../store/filters/filtersSelectors'
import { notificate } from '../../../store/notification/notificationActions'

export default function FilterBrandsCheckbox() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()

  const actualFilters = useSelector(actualFiltersSelector)
  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios('/api/filters/brand')
      .then((resp) => {
        setBrands(resp.data.sort((a, b) => a.name.localeCompare(b.name)))
      })
      .catch((e) => {
        dispatch(
          notificate({
            variant: 'error',
            data: e,
          })
        )
      })
  }, [dispatch])

  const handleChange = (event) => {
    const newActualFilters = toggleItemInArr(
      event.target.name,
      'brand',
      actualFilters
    )

    const queryString = objToQueryString(newActualFilters, '/products/&')
    history.push(queryString)
  }

  const list = brands.map((elem) => (
    <FormControlLabel
      className={classes.columns}
      key={elem._id}
      control={
        <Checkbox
          checked={
            (actualFilters.brand && actualFilters.brand.includes(elem.name)) ||
            false
          }
          icon={
            <CheckBoxOutlineBlankIcon
              className={classes.smallerText}
              fontSize="small"
            />
          }
          checkedIcon={
            <CheckBoxIcon className={classes.smallerText} fontSize="small" />
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
        Select brands:
      </FormLabel>
      {list}
    </FormGroup>
  )
}
