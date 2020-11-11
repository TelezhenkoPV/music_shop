import axios from 'axios'

import React, { useEffect, useState } from 'react'

import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckBoxIcon from '@material-ui/icons/CheckBox'
import FormLabel from '@material-ui/core/FormLabel'
import { useStyles } from './styles'

export default function FilterColorsCheckbox() {
  const classes = useStyles()

  const [colors, setColors] = useState([])

  useEffect(() => {
    console.log('hi')
    axios(' http://localhost:5000/api/colors')
      .then((resp) => setColors(resp.data))
      .catch((e) => console.log(e))
  }, [])

  const handleChange = () => {
    console.log('hi')
  }

  const list = colors.map((elem) => (
    <FormControlLabel
      control={
        <Checkbox
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
        Выбрать цвет:
      </FormLabel>
      {list}
    </FormGroup>
  )
}
