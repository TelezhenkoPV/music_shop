import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterPriceIntervalAction } from '../../../store/filters/filtersAction'
import { filterPricesIntervalSelector } from '../../../store/filters/filtersSelectors'

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 200,
    paddingLeft: 5,
    paddingTop: 50,
  },
  text: {
    textAlign: 'center',
  },
})

function valuetext(value) {
  return `${value}$`
}

export default function FilterPriceSlider() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const classes = useStyles()
  const dispatch = useDispatch()
  // const [value, setValue] = React.useState([20, 37])
  const pricesInterval = useSelector(filterPricesIntervalSelector)

  const handleChange = (event, newValue) => {
    console.log(newValue)
    dispatch(setFilterPriceIntervalAction(newValue))
  }

  return (
    <div className={classes.root}>
      <Typography id="range-slider" className={classes.text} gutterBottom>
        Цена "от" - "до"
      </Typography>
      <Slider
        min={0}
        max={2000}
        value={pricesInterval}
        onChange={handleChange}
        valueLabelDisplay="auto"
        step={50}
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  )
}
