import axios from 'axios'

import React, { useEffect, useState } from 'react'

import { useStyles } from './styles'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormLabel from '@material-ui/core/FormLabel'

export default function FilterColorsCheckbox() {
  const classes = useStyles()

  const [colors, setColors] = useState([])

  useEffect(() => {
    axios('/colors')
      .then((resp) => setColors(resp.data))
      .catch((e) => console.log(e))
  }, [])

  const handleChange = (event) => {}

  const list = colors.map((elem) => (
    <FormControlLabel
      key={elem._id}
      control={
        <Checkbox
          // checked={filtersColors.includes(elem.name)}
          icon={
            <CheckBoxOutlineBlankIcon
              htmlColor={
                (elem.name !== 'white' &&
                  elem.name !== 'multicolor' &&
                  elem.name) ||
                'primary'
              }
              fontSize="small"
            />
          }
          checkedIcon={
            <CheckBoxIcon
              htmlColor={
                (elem.name !== 'white' &&
                  elem.name !== 'multicolor' &&
                  elem.name) ||
                'primary'
              }
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
        Select colors:
      </FormLabel>
      {list}
    </FormGroup>
  )
}