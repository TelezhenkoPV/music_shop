import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './cashStyles'

import Button from '@material-ui/core/Button'

import { getActiveStep } from '../../../store/order/orderSelectors'

import {
  setActiveStep,
  savePaymentData,
} from '../../../store/order/orderActions'

export default function NovaPoshta() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)

  const back = () => {
    handleSubmit()
    dispatch(setActiveStep(activeStep - 1))
  }

  const next = () => {
    handleSubmit()
    dispatch(setActiveStep(activeStep + 1))
  }

  const handleSubmit = () => {
    dispatch(
      savePaymentData({ type: { key: 'cash', label: 'Cash' }, data: {} })
    )
  }

  return (
    <div className={classes.root}>
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          disabled={activeStep === 0}
          onClick={back}
          className={classes.button}
        >
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={next}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
