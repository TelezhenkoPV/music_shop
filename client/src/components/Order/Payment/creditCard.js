import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './creditCardStyles'

import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import MaskedText from 'react-text-mask'

import {
  luhnCheck,
  creditCardExpireDateCheck,
} from '../../../validation/schema'

import {
  getIsAuthenticated,
  getUserData,
} from '../../../store/user/userSelectors'

import {
  getActiveStep,
  getIsCreditCardSet as getIsPaymentSet,
  getCreditCardData as getPaymentData,
} from '../../../store/order/orderSelectors'

import { getCustomer } from '../../../store/user/userActions'
import {
  setActiveStep,
  savePaymentData,
} from '../../../store/order/orderActions'

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props
  return (
    <MaskedText
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null)
      }}
      showMask
    />
  )
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
}

export default function CreditCard() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const isAuthenticated = useSelector(getIsAuthenticated)
  const {
    firstName,
    lastName,
    creditCard: profileCreditCardList = [],
  } = useSelector(getUserData)
  const [profileCreditCardNumber, setProfileCreditCardNumber] = useState('')

  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [action, setAction] = useState(null)

  useEffect(() => {
    if (isAuthenticated) dispatch(getCustomer())
  }, [dispatch, isAuthenticated])

  const activeStep = useSelector(getActiveStep)

  const [creditCard, setCreditCard] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    name: '',
  })

  const isPaymentSet = useSelector(getIsPaymentSet)
  const payment = useSelector(getPaymentData)

  const back = () => {
    setErrors(validate(creditCard))
    setIsSubmitting(true)
    setAction(-1)
  }

  const next = () => {
    setErrors(validate(creditCard))
    setIsSubmitting(true)
    setAction(1)
  }

  useEffect(() => {
    if (isPaymentSet) {
      setCreditCard(payment)
    }
  }, [dispatch, isPaymentSet, payment])

  const handleCustomChange = (event) => {
    setCreditCard({
      ...creditCard,
      [event.target.name]: event.target.value,
    })
  }

  const handleProfileChange = (event) => {
    setProfileCreditCardNumber(event.target.value)
    if (isAuthenticated) {
      const profileCreditCard = profileCreditCardList.find(
        (card) => card.cardNumber === event.target.value
      )
      if (profileCreditCard) {
        const { cardNumber, expiryDate } = profileCreditCard
        setCreditCard({
          cardNumber,
          expiryDate,
          cvc: ' ',
          name: `${firstName} ${lastName}`,
        })
      }
    }
  }

  const validate = (values) => {
    const errors = {}
    if (!values.cardNumber) {
      errors.cardNumber = 'Credit Card number is required'
    } else if (!luhnCheck(values.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = 'Credit Card number is invalid'
    }
    if (!values.expiryDate) {
      errors.expiryDate = 'Credit Card expiration date is required'
    } else if (!creditCardExpireDateCheck(values.expiryDate)) {
      errors.expiryDate = 'Invalid Expiration Date'
    }
    if (!values.cvc) {
      errors.cvc = 'CVV is required'
    } else if (!values.cvc.match(/^[0-9]{3}$/)) {
      errors.cvc = 'Invalid CVV code'
    }
    return errors
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      dispatch(
        savePaymentData({
          type: { key: 'creditCard', label: 'Credit card' },
          data: creditCard,
        })
      )
      dispatch(setActiveStep(activeStep + action))
    }
  }, [errors, action, activeStep, dispatch, isSubmitting, creditCard])

  return (
    <div className={classes.root}>
      <Typography className={classes.creditCardTitle}>
        Visa / Mastercard
      </Typography>
      <div className={classes.creditCardWrapper}>
        <div className={classes.creditCard}>
          <FormControl className={classes.creditCardControl}>
            <InputLabel htmlFor="customCardIdNumber">Number</InputLabel>
            <Input
              value={creditCard.cardNumber}
              onChange={handleCustomChange}
              name="cardNumber"
              id="customCardNumber"
              inputComponent={TextMaskCustom}
              inputProps={{
                mask: [
                  /[4|5]/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ],
                autoComplete: 'cc-number',
              }}
            />
            <FormHelperText
              id="customCardNumber-helper-text"
              className={errors.cardNumber && classes.errorText}
            >
              {errors.cardNumber ? errors.cardNumber : '16 digits'}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.creditCardControl}>
            <InputLabel htmlFor="customCardDateTill">Expire</InputLabel>
            <Input
              value={creditCard.expiryDate}
              onChange={handleCustomChange}
              name="expiryDate"
              id="customCardexpiryDate"
              inputComponent={TextMaskCustom}
              inputProps={{
                mask: [/[0|1]/, /\d/, '/', /\d/, /\d/],
                autoComplete: 'cc-exp',
              }}
            />
            <FormHelperText
              id="customCardNumber-helper-text"
              className={errors.expiryDate && classes.errorText}
            >
              {errors.expiryDate ? errors.expiryDate : 'MM/YY'}
            </FormHelperText>
          </FormControl>
          <FormControl className={classes.creditCardControl}>
            <InputLabel htmlFor="customCardCVC">CVV</InputLabel>
            <Input
              value={creditCard.cvc}
              onChange={handleCustomChange}
              name="cvc"
              id="customCardcvc"
              inputComponent={TextMaskCustom}
              inputProps={{
                mask: [/\d/, /\d/, /\d/],
                autoComplete: 'cc-csc',
              }}
            />
            <FormHelperText
              id="customCardCVC-helper-text"
              className={errors.cvc && classes.errorText}
            >
              {errors.cvc ? errors.cvc : '3 digits'}
            </FormHelperText>
          </FormControl>
        </div>
        <FormControl className={classes.creditCardControl} fullWidth>
          <InputLabel htmlFor="customCardHolderName">
            Cardholder name
          </InputLabel>
          <Input
            className={classes.creditCardHolderNameText}
            value={creditCard.name}
            onChange={handleCustomChange}
            name="name"
            id="customCardHolderName"
            autoComplete="cc-name"
          />
          <FormHelperText id="customCardName-helper-text">
            FirstName LastName
          </FormHelperText>
        </FormControl>
      </div>
      {isAuthenticated ? (
        <>
          <Typography className={classes.creditCardTitle}>
            Saved card
          </Typography>
          <TextField
            id="profileCard"
            name="profileCard"
            select
            label="Select card from profile"
            fullWidth
            value={profileCreditCardNumber}
            onChange={handleProfileChange}
            helperText="Please select saved card"
            disabled={profileCreditCardList.length === 0}
          >
            {profileCreditCardList.map((option) => (
              <MenuItem key={option.cardNumber} value={option.cardNumber}>
                {`XXXX XXXX XXXX ${option.cardNumber.substring(15)} Exp: ${
                  option.expiryDate
                }`}
              </MenuItem>
            ))}
          </TextField>
        </>
      ) : null}

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
          onClick={next}
          className={classes.button}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
