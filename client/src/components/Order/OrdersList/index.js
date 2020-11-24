import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import useStyles from './styles'

// import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemIcon from '@material-ui/core/ListItemIcon'
// import ListItemText from '@material-ui/core/ListItemText'
// import Button from '@material-ui/core/Button'

// import PersonIcon from '@material-ui/icons/Person'
// import CakeIcon from '@material-ui/icons/Cake'
// import LocationOnIcon from '@material-ui/icons/LocationOn'
// import CreditCardIcon from '@material-ui/icons/CreditCard'
// import PhoneIcon from '@material-ui/icons/Phone'
// import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
// import WcIcon from '@material-ui/icons/Wc'
// import CheckIcon from '@material-ui/icons/Check'

import { getUserOrders } from '../../../store/user/userActions'
import {
  userOrders,
  isGetUserOrdersProceed,
} from '../../../store/user/userSelectors'

export default function OrdersList() {
  //   const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const orders = useSelector(userOrders)
  const isLoading = useSelector(isGetUserOrdersProceed)

  console.log('Orders', orders)

  return (
    <>{isLoading ? <CircularProgress /> : <Typography>Orders</Typography>}</>
  )
}
