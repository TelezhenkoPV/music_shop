import React from 'react'
import { useSelector } from 'react-redux'
import useStyles from './styles'

import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'

import { getOrderCreateSuccess } from '../../../store/order/orderSelectors'
import { getIsAuthenticated } from '../../../store/user/userSelectors'
import { rootURL } from '../../../config.js'

export default function Finish() {
  const classes = useStyles()

  const { order } = useSelector(getOrderCreateSuccess)

  const isAuthenticated = useSelector(getIsAuthenticated)

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Finish</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <div className={classes.order}>
        <div className={classes.orderData}>
          <Typography
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
            align="center"
            noWrap
          >{`Order №${order.orderNo}`}</Typography>
          <Typography
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
            align="center"
            noWrap
          >
            Successfully created
          </Typography>
        </div>

        <div className={classes.orderStatusIcon}>
          <CheckCircleOutlineOutlinedIcon fontSize="inherit" />
        </div>

        <div className={classes.orderStatusMail}>
          <Typography
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
            align="center"
            noWrap
          >
            Message sent
          </Typography>
          <Typography
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
            align="center"
            noWrap
          >
            on your Email
          </Typography>
        </div>

        <div className={classes.orderStatus}>
          {isAuthenticated ? (
            <>
              <Typography
                style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                align="center"
                noWrap
              >
                Go to
                <Link to={'/customer/profile/orders'}>
                  {' '}
                  Orders tab in Profile{' '}
                </Link>
              </Typography>
              <Typography
                style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                align="center"
                noWrap
              >
                to check status of your order
              </Typography>
            </>
          ) : (
            <>
              <Typography
                style={{ fontSize: 'inherit', fontWeight: 'inherit' }}
                align="center"
                noWrap
              >
                Status of your order you can see folowing to
              </Typography>
              <Link
                to={`${rootURL}/order/${order.orderNo}`}
              >{`${rootURL}/order/${order.orderNo}`}</Link>
            </>
          )}
        </div>
      </div>
      <div className={classes.actions}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/"
          className={classes.button}
        >
          Back to main page
        </Button>
      </div>
    </div>
  )
}
