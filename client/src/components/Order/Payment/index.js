import React from 'react'
// import React, { useState } from 'react'
// import { useSelector } from 'react-redux'
import useStyles from './styles'

import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'

// import AddressDelivery from './addressDelivery'
// import NovaPoshta from './novaPoshta'

// import { getPaymentMethod } from '../../../store/order/orderSelectors'

export default function Payment() {
  const classes = useStyles()

  // const paymentMethods = ['cash', 'creditCard']
  // const selectedPaymentMethod = useSelector(getPaymentMethod)
  // const [radioIndex, setRadioIndex] = useState(
  //   paymentMethods.indexOf(selectedPaymentMethod || paymentMethods[0])
  // )

  // const handleChangeTab = (event, newTabIndex) => {
  //   setTabIndex(newTabIndex)
  // }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Payment</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>
    </div>
  )
}
