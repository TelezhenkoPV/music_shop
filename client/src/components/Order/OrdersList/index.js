import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import { DataGrid } from '@material-ui/data-grid'

import { getUserOrders } from '../../../store/user/userActions'
import {
  userOrders,
  isGetUserOrdersProceed,
} from '../../../store/user/userSelectors'

const columns = [
  { field: 'orderNo', headerName: 'Order Number' },
  { field: 'date', headerName: 'Order date' },
  { field: 'shippingType', headerName: 'Shipping method' },
  { field: 'prodQty', headerName: 'QTY' },
  { field: 'totalSum', headerName: 'Total' },
  { field: 'status', headerName: 'Status' },
]

export default function OrdersList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const orders = useSelector(userOrders)
  const isLoading = useSelector(isGetUserOrdersProceed)

  const rows = orders.map((order, i) => {
    const {
      orderNo,
      date,
      shipping: {
        type: { label: shippingType },
      },
      totalSum,
      status,
      products,
    } = order
    const prodQty = products.reduce(
      (totalQty, prod) => totalQty + prod.cartQuantity,
      0
    )
    return { id: i, orderNo, date, shippingType, prodQty, totalSum, status }
  })

  return (
    <div className={classes.root}>
      <div style={{ flexGrow: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          checkboxSelection
          loading={isLoading}
        />
      </div>
    </div>
  )
}
