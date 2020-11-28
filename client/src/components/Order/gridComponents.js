import React from 'react'
import PropTypes from 'prop-types'
import useStyles from './gridComponentsStyles'
import { withStyles } from '@material-ui/core/styles'
import { fade } from '@material-ui/core/styles/colorManipulator'
import { Table } from '@devexpress/dx-react-grid-material-ui'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Link from '@material-ui/core/Link'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import ArrowUpward from '@material-ui/icons/ArrowUpward'
import PersonIcon from '@material-ui/icons/Person'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet'
import CreditCardIcon from '@material-ui/icons/CreditCard'

const styles = (theme) => ({
  tableStriped: {
    '& tbody tr:nth-of-type(odd)': {
      backgroundColor: fade(theme.palette.primary.main, 0.05),
    },
  },
  headStyled: {
    backgroundColor: theme.palette.primary.dark,
    '& th': {
      color: theme.palette.primary.contrastText,
      [theme.breakpoints.only('xs')]: {
        fontSize: '10px',
      },
    },
  },
  cellStyled: {
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px',
    },
  },
  cellStatusStyled: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    [theme.breakpoints.only('xs')]: {
      fontSize: '10px',
    },
  },
})

export const formatDate = (date) =>
  `${date.substring(8, 10)}.${date.substring(5, 7)}.${date.substring(
    0,
    4
  )} ${date.substring(11, 16)}`
export const formatCurrency = (value) =>
  value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// Table
const TableComponentBase = ({ classes, ...restProps }) => (
  <Table.Table {...restProps} className={classes.tableStriped} />
)
export const TableComponent = withStyles(styles, { name: 'TableComponent' })(
  TableComponentBase
)

// Header
const HeadComponentBase = ({ classes, ...restProps }) => (
  <Table.TableHead {...restProps} className={classes.headStyled} />
)
export const HeadComponent = withStyles(styles, { name: 'HeadComponent' })(
  HeadComponentBase
)

const SortingIcon = ({ direction }) =>
  direction === 'asc' ? (
    <ArrowUpward style={{ margin: '0 4px', fontSize: '18px' }} />
  ) : (
    <ArrowDownward style={{ margin: '0 4px', fontSize: '18px' }} />
  )

export const SortLabel = ({ column, onSort, children, direction }) => (
  <div
    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
    onClick={column.name === 'date' ? onSort : undefined}
  >
    {children}
    {direction && column.name === 'date' && (
      <SortingIcon direction={direction} />
    )}
  </div>
)

// Cells
const CellComponentBase = ({ classes, ...props }) => (
  <Table.Cell {...props} className={classes.cellStyled} />
)
const CellComponent = withStyles(styles, { name: 'CellComponent' })(
  CellComponentBase
)

const HighlightedCell = ({ value, ...props }) => (
  <CellComponent {...props}>
    <span
      style={{
        color:
          value === 'new'
            ? '#002FCA'
            : value === 'in work'
            ? '#CA9D00'
            : value === 'done'
            ? '#04B000'
            : value === 'canceled'
            ? '#D10000'
            : 'black',
      }}
    >
      {value.toUpperCase()}
    </span>
  </CellComponent>
)

export const Cell = (props) => {
  const { column } = props
  if (column.name === 'status') {
    return <HighlightedCell {...props} />
  }
  return <CellComponent {...props} />
}

// Order data row
export function RowData({ label, icon, data }) {
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

export function OrderCustomerFields({ data }) {
  const {
    firstName = '',
    lastName = '',
    middleName = '',
    email = '',
    telephone = '',
  } = data
  const customerFields = [
    {
      label: 'Full Name',
      icon: <PersonIcon style={{ margin: '0 8px' }} />,
      data: `${firstName}${middleName && ' ' + middleName}${
        lastName && ' ' + lastName
      }`,
    },
    {
      label: 'Email',
      icon: <EmailOutlinedIcon style={{ margin: '0 8px' }} />,
      data: email,
    },
    {
      label: 'Telephone',
      icon: <PhoneIcon style={{ margin: '0 8px' }} />,
      data: telephone,
    },
  ].map(({ label, icon, data }) => (
    <RowData key={label} label={label} icon={icon} data={data} />
  ))

  return customerFields
}

OrderCustomerFields.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    middleName: PropTypes.string,
    email: PropTypes.string,
    telephone: PropTypes.string.isRequired,
  }).isRequired,
}

export function OrderShippingFields({ data }) {
  const { type: shippingType, data: shippingData } = data
  const shippingFields = [
    {
      label: 'Shipping method',
      icon: <LocalShippingIcon style={{ margin: '0 8px' }} />,
      data: shippingType.label,
    },
    ...shippingData.map(({ label, value }) => {
      return {
        label,
        icon: <LocationOnIcon style={{ margin: '0 8px' }} />,
        data: value,
      }
    }),
  ].map(({ label, icon, data }) => (
    <RowData key={label} label={label} icon={icon} data={data} />
  ))

  return shippingFields
}

OrderShippingFields.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
}

export function OrderPaymentFields({ data }) {
  const { type: paymentType, data: paymentData } = data
  const paymentFields = [
    {
      label: 'Payment method',
      icon: <AccountBalanceWalletIcon style={{ margin: '0 8px' }} />,
      data: paymentType.label,
    },
    paymentType.key === 'creditCard'
      ? {
          label: 'Credit card',
          icon: <CreditCardIcon style={{ margin: '0 8px' }} />,
          data: paymentData.cardNumber,
        }
      : { label: null, icon: null, data: null },
  ].map(
    ({ label, icon, data }) =>
      label && <RowData key={label} label={label} icon={icon} data={data} />
  )
  return paymentFields
}

OrderPaymentFields.propTypes = {
  data: PropTypes.shape({
    type: PropTypes.shape({
      label: PropTypes.string.isRequired,
    }).isRequired,
    data: PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    }),
  }),
}

export function OrderProductsFields({ data: { products, totalSum } }) {
  const classes = useStyles()
  const productsFields = products.map(({ cartQuantity, product }) => {
    const { imageUrls, name, currentPrice, color, brand, itemNo } = product
    return (
      <div key={itemNo}>
        <div className={classes.orderProduct}>
          {imageUrls.length > 0 ? (
            <div
              className={classes.orderProductImage}
              style={{ backgroundImage: `url(/${imageUrls[0]})` }}
            />
          ) : null}
          <div className={classes.orderProductData}>
            <div className={classes.orderProductRow}>
              <span>
                <strong>Product:</strong>{' '}
                <Link href={`/product/${itemNo}`}>{name}</Link>
              </span>
              <span>
                (<strong>Brand:</strong> {brand} )
              </span>
              <span style={{ marginLeft: 'auto' }}>
                <strong>ID:</strong> {itemNo}
              </span>
            </div>
            {color && (
              <span>
                <strong>Color:</strong> {color}
              </span>
            )}
            <div className={classes.orderProductRow}>
              <span style={{ minWidth: '100px' }}>
                {formatCurrency(currentPrice)}
              </span>
              <span style={{ minWidth: '100px' }}>{cartQuantity} pcs</span>
              <span
                style={{
                  marginLeft: 'auto',
                  minWidth: '100px',
                  textAlign: 'right',
                }}
              >
                <strong>{formatCurrency(currentPrice * cartQuantity)}</strong>
              </span>
            </div>
          </div>
        </div>
        <Divider className={classes.orderProductDivider} variant="middle" />
      </div>
    )
  })
  return (
    <div className={classes.orderProductWrapper}>
      {productsFields}
      <div className={classes.orderProductTotal}>
        <span style={{ minWidth: '100px' }}>Total:</span>
        <span>{formatCurrency(totalSum)}</span>
      </div>
    </div>
  )
}

OrderProductsFields.propTypes = {
  data: PropTypes.shape({
    products: PropTypes.arrayOf(
      PropTypes.shape({
        cartQuantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
          name: PropTypes.string.isRequired,
          currentPrice: PropTypes.number.isRequired,
          color: PropTypes.string,
          brand: PropTypes.string.isRequired,
          itemNo: PropTypes.string.isRequired,
        }),
      })
    ),
    totalSum: PropTypes.number,
  }),
}

export function OrderDetail({ data }) {
  const classes = useStyles()
  const {
    customer = {},
    shipping = {},
    payment = {},
    products = [],
    totalSum = 0,
  } = data
  return (
    <div>
      <Typography className={classes.fildGroupTitle}>Customer...</Typography>
      <OrderCustomerFields data={customer} />

      <Typography className={classes.fildGroupTitle}>Shipping...</Typography>
      <OrderShippingFields data={shipping} />

      <Typography className={classes.fildGroupTitle}>Payment...</Typography>
      <OrderPaymentFields data={payment} />

      {products.length > 0 ? (
        <>
          <Typography className={classes.fildGroupTitle}>
            Products...
          </Typography>
          <OrderProductsFields data={{ products, totalSum }} />
        </>
      ) : null}
    </div>
  )
}

OrderDetail.propTypes = {
  data: PropTypes.shape({
    customer: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string,
      middleName: PropTypes.string,
      email: PropTypes.string,
      telephone: PropTypes.string.isRequired,
    }).isRequired,
    shipping: PropTypes.shape({
      type: PropTypes.shape({
        label: PropTypes.string.isRequired,
      }).isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string.isRequired,
        })
      ).isRequired,
    }),
    payment: PropTypes.shape({
      type: PropTypes.shape({
        label: PropTypes.string.isRequired,
      }).isRequired,
      data: PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    }),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        cartQuantity: PropTypes.number.isRequired,
        product: PropTypes.shape({
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
          name: PropTypes.string.isRequired,
          currentPrice: PropTypes.number.isRequired,
          color: PropTypes.string,
          brand: PropTypes.string.isRequired,
          itemNo: PropTypes.string.isRequired,
        }),
      })
    ),
    totalSum: PropTypes.number,
  }),
}
