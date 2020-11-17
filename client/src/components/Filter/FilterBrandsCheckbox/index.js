import axios from 'axios'

import React, { useEffect, useState } from 'react'

import { useStyles } from './styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormLabel from '@material-ui/core/FormLabel'

export default function FilterBrandsCheckbox() {
  const classes = useStyles()

  const [brands, setBrands] = useState([])

  useEffect(() => {
    axios('/filters/brand')
      .then((resp) => setBrands(resp.data))
      .catch((e) => console.log(e))
  }, [])

  const handleChange = (event) => {
    // dispatch(toggleFilterColorAction(event.target.name))
    // createPathnameFromFiltersData(
    //   history,
    //   filtersCategories,
    //   filtersColors,
    //   minPrice,
    //   maxPrice
    // )
  }

  const list = brands.map((elem) => (
    <FormControlLabel
      key={elem._id}
      control={
        <Checkbox
          // checked={filtersColors.includes(elem.name)}
          icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
          checkedIcon={<CheckBoxIcon fontSize="small" />}
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
