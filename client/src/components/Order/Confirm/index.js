import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'

import {
  getActiveStep,
  getOrderData,
} from '../../../store/order/orderSelectors'

import { setActiveStep, sendOrder } from '../../../store/order/orderActions'

export default function Confirm() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)

  const order = useSelector(getOrderData)

  const back = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  const handleSubmit = () => {
    console.log('Order confirmed', order)
    dispatch(sendOrder(order))
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Confirmation</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <div className={classes.paper}>
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
            onClick={handleSubmit}
            className={classes.button}
          >
            Confirm order
          </Button>
        </div>
      </div>
    </div>
  )
}
