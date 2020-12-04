import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './editStyles'

import { Formik, Form, Field, FieldArray } from 'formik'
import { schemaPersonalInformation } from '../../validation/schema'
import { TextField, RadioGroup } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import MaskedText from 'react-text-mask'

import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import Tooltip from '@material-ui/core/Tooltip'

import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import CakeIcon from '@material-ui/icons/Cake'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import WcIcon from '@material-ui/icons/Wc'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddIcon from '@material-ui/icons/Add'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded'
import CheckCircleOutlineOutlinedIcon from '@material-ui/icons/CheckCircleOutlineOutlined'
import creditCard_icon from '../../assets/credit-card.svg'

import { toogleProfileEdit, update } from '../../store/user/userActions'

import {
  getIsUpdateProceed,
  getUpdateError,
  getIsUpdateSuccessful,
} from '../../store/user/userSelectors'

export default function EditPersonalInformation({
  data: {
    firstName,
    lastName,
    middleName = '',
    gender,
    birthdate,
    email,
    telephone,
    addressDelivery = [],
    creditCard = [],
  },
}) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const initialValues = {
    firstName,
    lastName,
    middleName,
    gender,
    birthdate,
    email,
    telephone,
    addressDelivery,
    creditCard,
  }

  const [submit, setSubmit] = useState({ isSubmitting: false })

  const isUpdateSuccessful = useSelector(getIsUpdateSuccessful)
  const isUpdateProceed = useSelector(getIsUpdateProceed)
  const updateError = useSelector(getUpdateError)

  useEffect(() => {
    if (submit.isSubmitting && !isUpdateProceed) {
      submit.setSubmitting(false)
      setSubmit({ isSubmitting: false })
      submit.setErrors({ ...updateError })

      if (isUpdateSuccessful) dispatch(toogleProfileEdit(false))
    }
  }, [isUpdateSuccessful, isUpdateProceed, updateError, submit, dispatch])

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    dispatch(update(values))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  const handleClose = () => {
    dispatch(toogleProfileEdit(false))
  }

  const handleClickDefaultAddress = (setFieldValue, addresses, index) => {
    setFieldValue(
      'addressDelivery',
      addresses.map((address, i) =>
        i === index
          ? { ...address, isDefault: true }
          : { ...address, isDefault: false }
      )
    )
  }

  const handleClickDefaultCreditCard = (setFieldValue, cards, index) => {
    setFieldValue(
      'creditCard',
      cards.map((card, i) =>
        i === index
          ? { ...card, isDefault: true }
          : { ...card, isDefault: false }
      )
    )
  }

  return (
    <>
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaPersonalInformation}
          onSubmit={handleSubmit}
        >
          {({ values, submitForm, isValid, isSubmitting, setFieldValue }) => (
            <Form className={classes.form}>
              <Grid container spacing={10}>
                <Grid item xs={12} md={6}>
                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <PersonIcon />
                      <Typography className={classes.infoLabelText}>
                        Full Name
                      </Typography>
                    </div>

                    <Field
                      component={TextField}
                      className={classes.marginBottom}
                      classes={{ root: classes.textField }}
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      id="firstName"
                      name="firstName"
                      label="First Name"
                      required
                      autoComplete="name given-name"
                      autoFocus
                      disabled={isSubmitting}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                    />

                    <Field
                      component={TextField}
                      className={classes.marginBottom}
                      classes={{
                        root: classes.textField,
                      }}
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      id="lastName"
                      name="lastName"
                      label="Last Name"
                      required
                      autoComplete="name family-name"
                      disabled={isSubmitting}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                    />

                    <Field
                      component={TextField}
                      className={classes.marginBottom}
                      classes={{
                        root: classes.textField,
                      }}
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      id="middleName"
                      name="middleName"
                      label="Middle Name"
                      autoComplete="name middle-name"
                      disabled={isSubmitting}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                    />
                  </div>

                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <EmailOutlinedIcon />
                      <Typography className={classes.infoLabelText}>
                        Email
                      </Typography>
                    </div>

                    <Field
                      component={TextField}
                      className={classes.marginBottom}
                      classes={{ root: classes.textField }}
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      id="email"
                      name="email"
                      //   label="Email"
                      required
                      autoComplete="email"
                      disabled={isSubmitting}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                    />
                  </div>

                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <WcIcon />
                      <Typography className={classes.infoLabelText}>
                        Gender
                      </Typography>
                    </div>

                    <Field
                      component={RadioGroup}
                      id="gender"
                      name="gender"
                      className={classes.marginBottom}
                      classes={{ root: classes.radioGroup }}
                    >
                      <FormControlLabel
                        classes={{ root: classes.textField }}
                        value="male"
                        control={<Radio disabled={isSubmitting} />}
                        label="Male"
                        disabled={isSubmitting}
                      />
                      <FormControlLabel
                        classes={{ root: classes.textField }}
                        value="female"
                        control={<Radio disabled={isSubmitting} />}
                        label="Female"
                        disabled={isSubmitting}
                      />
                    </Field>
                  </div>

                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <div className={classes.info}>
                      <div className={classes.infoLabel}>
                        <CakeIcon />
                        <Typography className={classes.infoLabelText}>
                          Birthday
                        </Typography>
                      </div>

                      <Field
                        component={DatePicker}
                        className={classes.marginBottom}
                        classes={{ root: classes.textField }}
                        variant="outlined"
                        margin="dense"
                        size="small"
                        fullWidth
                        format="dd.MM.yyyy"
                        id="birthdate"
                        name="birthdate"
                        required
                        autoComplete="birthdate"
                        disabled={isSubmitting}
                        FormHelperTextProps={{
                          className: classes.helperText,
                        }}
                      />
                    </div>
                  </MuiPickersUtilsProvider>

                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <PhoneIcon />
                      <Typography className={classes.infoLabelText}>
                        Phone
                      </Typography>
                    </div>

                    <Field
                      component={TextField}
                      className={classes.marginBottom}
                      classes={{ root: classes.textField }}
                      variant="outlined"
                      margin="dense"
                      size="small"
                      fullWidth
                      id="telephone"
                      name="telephone"
                      //   label="Phone"
                      autoComplete="tel"
                      disabled={isSubmitting}
                      FormHelperTextProps={{
                        className: classes.helperText,
                      }}
                    />
                  </div>
                </Grid>
                <Grid item xs={12} md={6}>
                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <LocationOnIcon />
                      <Typography className={classes.infoLabelText}>
                        Delivery addresses
                      </Typography>
                    </div>
                    <FieldArray
                      name="addressDelivery"
                      render={(arrayHelpers) => (
                        <div>
                          {values.addressDelivery &&
                          values.addressDelivery.length > 0
                            ? values.addressDelivery.map((address, index) => (
                                <div key={index} className={classes.listItem}>
                                  <Field
                                    component={TextField}
                                    classes={{ root: classes.textField }}
                                    variant="outlined"
                                    margin="dense"
                                    size="small"
                                    fullWidth
                                    id={`addressDelivery.${index}.address`}
                                    name={`addressDelivery.${index}.address`}
                                    autoComplete="street-address"
                                    disabled={isSubmitting}
                                    FormHelperTextProps={{
                                      className: classes.helperText,
                                    }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          <Tooltip
                                            title="Set default address"
                                            arrow
                                          >
                                            <IconButton
                                              className={classes.iconInline}
                                              onClick={() =>
                                                handleClickDefaultAddress(
                                                  setFieldValue,
                                                  values.addressDelivery,
                                                  index
                                                )
                                              }
                                            >
                                              {address.isDefault ? (
                                                <CheckCircleOutlineOutlinedIcon
                                                  className={
                                                    classes.iconChecked
                                                  }
                                                />
                                              ) : (
                                                <RadioButtonUncheckedRoundedIcon />
                                              )}
                                            </IconButton>
                                          </Tooltip>
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                  <Tooltip title="Remove address" arrow>
                                    <IconButton
                                      className={classes.iconInline}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              ))
                            : null}
                          <Typography className={classes.listItem}>
                            Add one more address
                            <Tooltip title="Add address" arrow>
                              <IconButton
                                className={classes.iconInline}
                                onClick={() => arrayHelpers.push('')}
                              >
                                <AddLocationIcon />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </div>
                      )}
                    />
                  </div>

                  <div className={classes.info}>
                    <div className={classes.infoLabel}>
                      <CreditCardIcon />
                      <Typography className={classes.infoLabelText}>
                        Credit Cards
                      </Typography>
                    </div>
                    <FieldArray
                      name="creditCard"
                      render={(arrayHelpers) => (
                        <div>
                          {values.creditCard && values.creditCard.length > 0
                            ? values.creditCard.map((card, index) => (
                                <div key={index} className={classes.listItem}>
                                  <div className={classes.creditCard}>
                                    <img
                                      src={creditCard_icon}
                                      alt="Credit-card icon"
                                      className={classes.creditCardIcon}
                                    />
                                    <Field
                                      classes={{
                                        root: classes.creditCardNumber,
                                      }}
                                      name={`creditCard.${index}.cardNumber`}
                                    >
                                      {({ field }) => (
                                        <MaskedText
                                          {...field}
                                          className={
                                            classes.creditCardNumberText
                                          }
                                          mask={[
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
                                          ]}
                                          placeholder="Credit card number"
                                          type="text"
                                          disabled={isSubmitting}
                                          showMask
                                        />
                                      )}
                                    </Field>
                                    <Field
                                      classes={{
                                        root: classes.creditCardExpiry,
                                      }}
                                      name={`creditCard.${index}.expiryDate`}
                                    >
                                      {({ field }) => (
                                        <MaskedText
                                          {...field}
                                          className={
                                            classes.creditCardExpiryText
                                          }
                                          mask={[
                                            /[0|1]/,
                                            /\d/,
                                            '/',
                                            /\d/,
                                            /\d/,
                                          ]}
                                          placeholder="MM/YY"
                                          type="text"
                                          disabled={isSubmitting}
                                          showMask
                                        />
                                      )}
                                    </Field>
                                    <Field
                                      classes={{ root: classes.creditCardCVC }}
                                      name={`creditCard.${index}.cvc`}
                                    >
                                      {({ field }) => (
                                        <MaskedText
                                          {...field}
                                          className={classes.creditCardCVCText}
                                          mask={[/\d/, /\d/, /\d/]}
                                          placeholder="CVV"
                                          type="text"
                                          disabled={isSubmitting}
                                          showMask
                                        />
                                      )}
                                    </Field>
                                    <Tooltip
                                      title="Set default credit card"
                                      arrow
                                    >
                                      <IconButton
                                        className={classes.iconInline}
                                        onClick={() =>
                                          handleClickDefaultCreditCard(
                                            setFieldValue,
                                            values.creditCard,
                                            index
                                          )
                                        }
                                      >
                                        {card.isDefault ? (
                                          <CheckCircleOutlineOutlinedIcon
                                            className={classes.iconChecked}
                                          />
                                        ) : (
                                          <RadioButtonUncheckedRoundedIcon />
                                        )}
                                      </IconButton>
                                    </Tooltip>
                                  </div>
                                  <Tooltip title="Remove credit card" arrow>
                                    <IconButton
                                      className={classes.iconInline}
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <DeleteForeverIcon />
                                    </IconButton>
                                  </Tooltip>
                                </div>
                              ))
                            : null}
                          <Typography className={classes.listItem}>
                            Add one more credit card
                            <Tooltip title="Add credit card" arrow>
                              <IconButton
                                className={classes.iconInline}
                                onClick={() =>
                                  arrayHelpers.push({
                                    cardNumber: '',
                                    expiryDate: '',
                                    cvc: '',
                                  })
                                }
                              >
                                <AddIcon />
                              </IconButton>
                            </Tooltip>
                          </Typography>
                        </div>
                      )}
                    />
                  </div>
                </Grid>
              </Grid>

              {isUpdateProceed ? (
                <LinearProgress />
              ) : (
                <Divider className={classes.devider} />
              )}

              <div className={classes.actions}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  className={classes.button}
                  variant="contained"
                  size="large"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  onClick={submitForm}
                >
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
