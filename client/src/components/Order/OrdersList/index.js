import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import Tooltip from '@material-ui/core/Tooltip'
import { getUserOrders } from '../../../store/user/userActions'
import {
  PagingState,
  IntegratedPaging,
  SortingState,
  IntegratedSorting,
  DataTypeProvider,
  // GroupingState,
  // IntegratedGrouping,
} from '@devexpress/dx-react-grid'
import {
  Grid,
  Table,
  TableHeaderRow,
  PagingPanel,
  // TableGroupRow,
  // GroupingPanel,
  // DragDropProvider,
  // Toolbar,
} from '@devexpress/dx-react-grid-material-ui'

import {
  TableComponent,
  HeadComponent,
  Cell,
  SortLabel,
} from './gridComponents'

import {
  userOrders,
  isGetUserOrdersProceed,
} from '../../../store/user/userSelectors'

const formatDate = (date) =>
  `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(0, 4)}`
const formatCurrency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

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

const CurrencyFormatter = ({ value }) => (
  <b style={{ color: 'darkblue' }}>
    {value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
  </b>
)

const CurrencyTypeProvider = (props) => (
  <DataTypeProvider formatterComponent={CurrencyFormatter} {...props} />
)

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

export default function OrdersList() {
  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserOrders())
  }, [dispatch])

  const orders = useSelector(userOrders)
  const isLoading = useSelector(isGetUserOrdersProceed)
  const [currencyColumns] = useState(['totalSum'])
  const [pageSizes] = useState([5, 10, 15, 0])
  // const [grouping, setGrouping] = useState([{columnName: 'status'}])

  const [tableColumnExtensions] = useState([
    {
      columnName: 'orderNo',
      align: 'left',
      width: '22%',
      wordWrapEnabled: true,
      groupingEnabled: false,
    },
    {
      columnName: 'date',
      align: 'center',
      width: '14%',
      wordWrapEnabled: true,
      groupingEnabled: false,
    },
    {
      columnName: 'shippingType',
      align: 'center',
      width: '19%',
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
      width: '14%',
      groupingEnabled: false,
    },
    { columnName: 'status', align: 'center', width: '14%' },
  ])

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
    return { orderNo, date, shippingType, prodQty, totalSum, status }
  })

  return (
    <div className={classes.root}>
      <div style={{ flexGrow: 1 }}>
        <Grid rows={rows} columns={columns} loading={isLoading}>
          <CurrencyTypeProvider for={currencyColumns} />
          {/* <DragDropProvider /> */}
          <SortingState
            defaultSorting={[{ columnName: 'date', direction: 'desc' }]}
          />
          {/* <GroupingState
              defaultGrouping={grouping}
              grouping={grouping}
              onGroupingChange={setGrouping}
              columnExtensions={tableColumnExtensions}
            /> */}
          <PagingState defaultCurrentPage={0} defaultPageSize={5} />
          <IntegratedSorting />
          {/* <IntegratedGrouping /> */}

          <IntegratedPaging />

          <CellTooltip />
          <Table
            tableComponent={TableComponent}
            headComponent={HeadComponent}
            cellComponent={Cell}
            columnExtensions={tableColumnExtensions}
          />
          <TableHeaderRow
            showSortingControls
            sortLabelComponent={SortLabel}
            // showGroupingControls
          />
          {/* <TableGroupRow /> */}
          {/* <Toolbar /> */}
          {/* <GroupingPanel showGroupingControls /> */}
          <PagingPanel pageSizes={pageSizes} />
        </Grid>
      </div>
    </div>
  )
}
