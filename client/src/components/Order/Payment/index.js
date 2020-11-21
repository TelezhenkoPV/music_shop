import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
// import clsx from 'clsx'
import useStyles from './styles'

import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import iconCash from '../../../assets/cash_icon.svg'
import iconCreditCard from '../../../assets/creditCard_icon.svg'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'

import Cash from './cash'
import CreditCard from './creditCard'
// import NovaPoshta from './novaPoshta'

import { getPaymentMethod } from '../../../store/order/orderSelectors'

function StyledRadio({ label, icon, ...props }) {
  const classes = useStyles()

  return (
    <div className={classes.paymentMethod}>
      <div className={classes.paymentMethodControl}>
        <Radio
          className={classes.radioRoot}
          disableRipple
          color="default"
          checkedIcon={<CheckBoxOutlinedIcon className={classes.radioIcon} />}
          icon={
            <CheckBoxOutlineBlankOutlinedIcon className={classes.radioIcon} />
          }
          {...props}
        />
        <Typography>{label}</Typography>
      </div>
      <div className={classes.paymentMethodIcon}>
        <img src={icon} alt={`${label} icon`} />
      </div>
    </div>
  )
}

StyledRadio.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

function RadioPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  )
}

RadioPanel.propTypes = {
  values: PropTypes.string,
  index: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
}

export default function Payment() {
  const classes = useStyles()

  const paymentMethods = [
    { value: 'cash', label: 'Cash', icon: iconCash, children: <Cash /> },
    {
      value: 'creditCard',
      label: 'Credit card',
      icon: iconCreditCard,
      children: <CreditCard />,
    },
  ]

  const selectedPaymentMethod = useSelector(getPaymentMethod)
  const [radioIndex, setRadioIndex] = useState(
    paymentMethods.find(
      (item) =>
        item.value === (selectedPaymentMethod || paymentMethods[0].value)
    ).value
  )

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

      <div className={classes.paper}>
        <FormControl component="fieldset" fullWidth>
          <RadioGroup
            className={classes.paymentMethodRoot}
            value={radioIndex}
            aria-label="Payment method"
            name="PaymentMethod"
            onChange={(event) => setRadioIndex(event.target.value)}
          >
            {paymentMethods.map(({ value, label, icon }) => {
              return (
                <FormControlLabel
                  key={value}
                  value={value}
                  control={<StyledRadio label={label} icon={icon} />}
                  aria-label={label}
                  classes={{ root: classes.paymentMethodWrapper }}
                />
              )
            })}
          </RadioGroup>
        </FormControl>

        {paymentMethods.map(({ value, children }) => {
          return (
            <RadioPanel
              key={value}
              value={radioIndex}
              index={value}
              className={classes.tabPanel}
            >
              {children}
            </RadioPanel>
          )
        })}
      </div>
    </div>
  )
}
