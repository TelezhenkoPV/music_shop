import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import useStyles, { useStepIconStyles } from './styles'

import Link from '@material-ui/core/Link'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'

import AccountCircle from '@material-ui/icons/AccountCircle'
import LocalShippingIcon from '@material-ui/icons/LocalShipping'
import PaymentIcon from '@material-ui/icons/Payment'
import DoneAllIcon from '@material-ui/icons/DoneAll'

import Customer from '../../components/Order/Customer'
import Shipping from '../../components/Order/Shipping'
import Payment from '../../components/Order/Payment'
import Confirm from '../../components/Order/Confirm'
import Summary from '../../components/Order/Summary'

import { getActiveStep } from '../../store/order/orderSelectors'

function StepIcon(props) {
  const classes = useStepIconStyles()
  const { active, completed, icon } = props

  const icons = {
    1: <AccountCircle />,
    2: <LocalShippingIcon />,
    3: <PaymentIcon />,
    4: <DoneAllIcon />,
  }

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(icon)]}
    </div>
  )
}

StepIcon.propTypes = {
  active: PropTypes.bool,
  completed: PropTypes.bool,
  icon: PropTypes.node,
}

function getStepContent(activeStep) {
  switch (activeStep) {
    case 0:
      return <Customer />
    case 1:
      return <Shipping />
    case 2:
      return <Payment />
    case 3:
      return <Confirm />
    default:
      return null
  }
}

function OrderCheckout() {
  const classes = useStyles()

  const activeStep = useSelector(getActiveStep)

  const steps = ['Customer Information', 'Shipping', 'Payment', 'Confirmation']

  return (
    <Container className={classes.root}>
      <Paper>
        <Box className={classes.title_box}>
          <Typography variant="h4" style={{ marginBottom: '1%' }}>
            Order checkout
          </Typography>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Main
            </Link>
            <Link
              color="textPrimary"
              aria-current="page"
              href="/customer/profile"
            >
              Order checkout
            </Link>
          </Breadcrumbs>
        </Box>
      </Paper>

      <Paper className={classes.checkoutRoot}>
        <Stepper
          classes={{ root: classes.stepperRoot }}
          alternativeLabel
          activeStep={activeStep}
          connector={
            <StepConnector
              classes={{
                alternativeLabel: classes.stepConnectorAlternativeLabel,
                active: classes.stepConnectorActive,
                completed: classes.stepConnectorCompleted,
                line: classes.stepConnectorLine,
              }}
            />
          }
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel
                classes={{ label: classes.stepLabel }}
                StepIconComponent={StepIcon}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {getStepContent(activeStep)}
          </Grid>
          <Grid item xs={12} md={4}>
            <Summary />
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}

export default OrderCheckout
