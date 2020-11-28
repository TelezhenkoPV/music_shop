import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Tooltip from '@material-ui/core/Tooltip'

import { getUserOrders } from '../../../store/user/userActions'
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  RowDetailState,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  TableRowDetail,
  TableColumnVisibility,
  // Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

import {
  formatDate,
  formatCurrency,
  TableComponent,
  HeadComponent,
  Cell,
  SortLabel,
  OrderDetail,
} from '../gridComponents'

import {
  userOrders,
  isGetUserOrdersProceed,
} from '../../../store/user/userSelectors'

const columns = [
  { name: 'orderNo', title: 'Order Number' },
  {
    name: 'date',
    title: 'Order date',
    getCellValue: ({ date }) => formatDate(date),
  },
  { name: 'shippingType', title: 'Shipping method' },
  { name: 'prodQty', title: 'QTY' },
  {
    name: 'totalSum',
    title: 'Total',
    getCellValue: ({ totalSum }) => formatCurrency(totalSum),
  },
  { name: 'status', title: 'Status' },
]

const TooltipFormatter = ({
  row: { date, shippingType, prodQty, totalSum, status },
  value,
}) => (
  <Tooltip
    title={
      <span>
        {`Date: ${formatDate(date)}`}
        <br />
        {`ShippingType: ${shippingType}`}
        <br />
        {`QTY: ${prodQty}`}
        <br />
        {`Total: ${formatCurrency(totalSum)}`}
        <br />
        {`Status: ${status.toUpperCase()}`}
      </span>
    }
  >
    <span>{value}</span>
  </Tooltip>
)

const CellTooltip = (props) => (
  <DataTypeProvider
    for={columns.map(({ name }) => name)}
    formatterComponent={TooltipFormatter}
    {...props}
  />
)

const RowDetail = ({ row }) => {
  const { customer, shipping, payment, products, totalSum } = row
  return (
    <OrderDetail data={{ customer, shipping, payment, products, totalSum }} />
  )
}

export default function OrdersList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const theme = useTheme()
  const bpXS = useMediaQuery(theme.breakpoints.only('xs'))
  const bpSM = useMediaQuery(theme.breakpoints.only('sm'))

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const orders = useSelector(userOrders)
  const isLoading = useSelector(isGetUserOrdersProceed)
  const [pageSizes] = useState([5, 10, 15, 0])

  const [tableColumnExtensions] = useState([
    {
      columnName: 'orderNo',
      align: 'left',
      width: '25%',
      wordWrapEnabled: true,
      groupingEnabled: false,
    },
    {
      columnName: 'date',
      align: 'center',
      width: 'auto',
      wordWrapEnabled: true,
      groupingEnabled: false,
    },
    {
      columnName: 'shippingType',
      align: 'center',
      width: '14%',
      wordWrapEnabled: true,
    },
    {
      columnName: 'prodQty',
      align: 'right',
      width: '8%',
      groupingEnabled: false,
    },
    {
      columnName: 'totalSum',
      align: 'right',
      width: 'auto',
      groupingEnabled: false,
    },
    { columnName: 'status', align: 'center', width: 'auto' },
  ])

  const rows = orders.map((order) => {
    const {
      orderNo,
      date,
      totalSum,
      status,
      products,
      customer,
      shipping,
      paymentInfo,
      shipping: {
        type: { label: shippingType },
      },
    } = order
    const prodQty = products.reduce(
      (totalQty, prod) => totalQty + prod.cartQuantity,
      0
    )
    return {
      orderNo,
      date,
      shippingType,
      prodQty,
      totalSum,
      status,
      customer: JSON.parse(customer),
      shipping,
      payment: paymentInfo,
      products,
    }
  })

  return (
    <div className={classes.root}>
      <div style={{ flexGrow: 1 }}>
        <Grid rows={rows} columns={columns} loading={isLoading}>
          <SortingState
            defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
          />
          <PagingState defaultCurrentPage={0} defaultPageSize={5} />
          <IntegratedSorting />
          <IntegratedPaging />
          <CellTooltip />
          <RowDetailState />
          <Table
            tableComponent={TableComponent}
            headComponent={HeadComponent}
            cellComponent={Cell}
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow showSortingControls sortLabelComponent={SortLabel} />
          {bpSM && (
            <TableColumnVisibility
              hiddenColumnNames={['shippingType', 'prodQty']}
            />
          )}
          {bpXS && (
            <TableColumnVisibility
              hiddenColumnNames={['orderNo', 'shippingType', 'prodQty']}
            />
          )}

          <TableRowDetail contentComponent={RowDetail} />

          {/* <Toolbar /> */}
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </div>
    </div>
  )
}
