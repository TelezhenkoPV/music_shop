import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import CreditCardIcon from '@material-ui/icons/CreditCard'

import {
  getActiveStep,
  getOrderData,
  getOrderProceed,
  getOrderCreateSuccess,
  getOrderCreateError,
} from '../../../store/order/orderSelectors'
import { setActiveStep, sendOrder } from '../../../store/order/orderActions'

function RowData({ label, icon, data }) {
  const classes = useStyles()
  return (
    <Grid key={data} container spacing={1} className={classes.info}>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="center"
        item
        xs={12}
        sm={4}
        className={classes.infoLabel}
      >
        {!!icon && icon}
        <Typography className={classes.infoText}>{label}</Typography>
      </Grid>
      <Grid item xs={12} sm={8} zeroMinWidth className={classes.infoData}>
        <Typography className={classes.infoText}>{data}</Typography>
      </Grid>
    </Grid>
  )
}

RowData.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  data: PropTypes.string.isRequired,
}

export default function Confirm() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)

  const order = useSelector(getOrderData)

  const {
    customer: {
      firstName = '',
      lastName = '',
      middleName = '',
      email = '',
      telephone = '',
    },
    shipping: { type: shippingType, data: shippingData },
    payment: { type: paymentType, data: paymentData },
  } = order

  const customerFields = [
    {
      label: 'Full Name',
      icon: <PersonIcon className={classes.iconInline} />,
      data: `${firstName}${middleName && ' ' + middleName}${
        lastName && ' ' + lastName
      }`,
    },
    {
      label: 'Email',
      icon: <EmailOutlinedIcon className={classes.iconInline} />,
      data: email,
    },
    {
      label: 'Telephone',
      icon: <PhoneIcon className={classes.iconInline} />,
      data: telephone,
    },
  ].map(({ label, icon, data }) => (
    <RowData key={label} label={label} icon={icon} data={data} />
  ))

  const shippingFields = [
    {
      label: 'Shipping method',
      icon: <LocalShippingIcon className={classes.iconInline} />,
      data: shippingType.label,
    },
    ...shippingData.map(({ label, value }) => {
      return {
        label,
        icon: <LocationOnIcon className={classes.iconInline} />,
        data: value,
      }
    }),
  ].map(({ label, icon, data }) => (
    <RowData key={label} label={label} icon={icon} data={data} />
  ))

  const paymentFields = [
    {
      label: 'Payment method',
      icon: <AccountBalanceWalletIcon className={classes.iconInline} />,
      data: paymentType.label,
    },
    paymentType.key === 'creditCard'
      ? {
          label: 'Credit card',
          icon: <CreditCardIcon className={classes.iconInline} />,
          data: paymentData.cardNumber,
        }
      : { label: null, icon: null, data: null },
  ].map(
    ({ label, icon, data }) =>
      label && <RowData key={label} label={label} icon={icon} data={data} />
  )

  const back = () => {
    dispatch(setActiveStep(activeStep - 1))
  }

  const handleSubmit = () => {
    const formedOrder = {
      status: 'new',
      email: order.customer.email,
      mobile: order.customer.telephone,
      letterSubject: 'Thank you for order! You are welcome!',
      letterHtml:
        '<h1>Your order is placed. OrderNo is ????.</h1><p>{Other details about order in your HTML}</p>',
      products: JSON.stringify([]),
      shipping: JSON.stringify(order.shipping),
      paymentInfo: JSON.stringify(order.payment),
      customer: JSON.stringify(order.customer),
    }
    order.customer._id && (formedOrder.customerId = order.customer._id)
    console.log('FormedOrder', formedOrder)

    dispatch(sendOrder(formedOrder))
  }

  const isOrderProceed = useSelector(getOrderProceed)
  const orderCreateSuccess = useSelector(getOrderCreateSuccess)
  const orderCreateError = useSelector(getOrderCreateError)

  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

  console.log('orderCreateSuccess', isSuccess, orderCreateSuccess)
  console.log('orderCreateError', isError, orderCreateError)

  useEffect(() => {
    orderCreateSuccess && setIsSuccess(true)
    orderCreateError && setIsError(true)
    isSuccess && dispatch(setActiveStep(activeStep + 1))
  }, [orderCreateSuccess, orderCreateError, isSuccess, activeStep, dispatch])

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Confirmation</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <div className={classes.OrderData}>
        <Typography className={classes.fildGroupTitle}>Customer...</Typography>
        {customerFields}

        <Typography className={classes.fildGroupTitle}>Shipping...</Typography>
        {shippingFields}

        <Typography className={classes.fildGroupTitle}>Payment...</Typography>
        {paymentFields}
      </div>

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
