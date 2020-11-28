import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import { MailSubject, MailBody } from '../../../mails/orderCreated'
import { OrderDetail } from '../gridComponents'

import { getIsAuthenticated } from '../../../store/user/userSelectors'
import { basketSelector } from '../../../store/basket/basketSelectors'
import {
  getActiveStep,
  getOrderData,
  getOrderProceed,
  getOrderCreateSuccess,
} from '../../../store/order/orderSelectors'
import { setActiveStep, sendOrder } from '../../../store/order/orderActions'

export default function Confirm() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)
  const isAuthenticated = useSelector(getIsAuthenticated)

  const order = useSelector(getOrderData)
  const products = useSelector(basketSelector)

  const back = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  const handleSubmit = () => {
    const orderNo = `${new Date().getTime()}-${Math.floor(
      Math.random() * 1000
    )}`
    const formedOrder = {
      orderNo,
      status: 'new',
      email: order.customer.email,
      mobile: order.customer.telephone,
      letterSubject: MailSubject({ orderNo }),
      letterHtml: MailBody({ ...order, orderNo, isAuthenticated, products }),
      products: JSON.stringify(products),
      shipping: JSON.stringify(order.shipping),
      paymentInfo: JSON.stringify(order.payment),
      customer: JSON.stringify(order.customer),
    }
    order.customer.customerId &&
      (formedOrder.customerId = order.customer.customerId)

    dispatch(sendOrder(formedOrder))
  }

  const isOrderProceed = useSelector(getOrderProceed)
  const orderCreateSuccess = useSelector(getOrderCreateSuccess)

  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    orderCreateSuccess && setIsSuccess(true)
    isSuccess && dispatch(setActiveStep(activeStep + 1))
  }, [orderCreateSuccess, isSuccess, activeStep, dispatch])
  console.log('Order: ', order)
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Confirmation</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <OrderDetail data={order} />

      {isOrderProceed ? (
        <LinearProgress className={classes.marginTop} />
      ) : (
        <Divider className={classes.marginTop} />
      )}

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
          Confirm
        </Button>
      </div>
    </div>
  )
}
