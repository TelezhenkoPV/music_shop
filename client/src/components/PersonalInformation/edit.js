import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './editStyles'

import * as Yup from 'yup'
import { Formik, Form, Field, FieldArray } from 'formik'
import { TextField, RadioGroup } from 'formik-material-ui'
import { DatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import Typography from '@material-ui/core/Typography'

import PersonIcon from '@material-ui/icons/Person'
import CakeIcon from '@material-ui/icons/Cake'
import LocationOnIcon from '@material-ui/icons/LocationOn'
// import CreditCardIcon from '@material-ui/icons/CreditCard'
import PhoneIcon from '@material-ui/icons/Phone'
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined'
import WcIcon from '@material-ui/icons/Wc'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import AddIcon from '@material-ui/icons/Add'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import CheckIcon from '@material-ui/icons/Check'

import { toogleProfileEdit, update } from '../../store/user/userActions'

import {
  getIsUpdateProceed,
  getUpdateError,
  getIsUpdateSuccessful,
} from '../../store/user/userSelectors'

const UpdateSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('First name is required')
    .min(2, 'First name must have at least 2 chars')
    .max(25, 'Max length of first name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'Первый символ должен быть заглавный')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  lastName: Yup.string()
    .required('Last name is required')
    .min(2, 'Last name must have at least 2 chars')
    .max(25, 'Max length of last name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "'Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  middleName: Yup.string()
    .min(2, 'Middle name must have at least 2 chars')
    .max(25, 'Max length of middle name is 25 chars')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'The first char must be in the Uppercase')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "'Permit chars: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  telephone: Yup.string().matches(
    /^\+380\d{3}\d{2}\d{2}\d{2}$/,
    'Use template +380XXXXXXXXX'
  ),
  email: Yup.string().required('Email is required').email('Email is incorrect'),
})

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
    creditCart = [],
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
    creditCart,
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
    // const sigUpData = (({ confirmPassword, ...rest }) => rest)(values)
    // dispatch(signUp(sigUpData))
    dispatch(update(values))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  return (
    <>
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={UpdateSchema}
          onSubmit={handleSubmit}
        >
          {({ values, submitForm, isValid, isSubmitting }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
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
                      required
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
                        //   label="Birthday"
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
                          {values.addressDelivery.map((address, index) => (
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
                              />
                              {address.isDefault && (
                                <CheckIcon className={classes.iconInline} />
                              )}
                              <IconButton
                                className={classes.iconInline}
                                onClick={() => arrayHelpers.remove(index)}
                              >
                                <DeleteForeverIcon />
                              </IconButton>
                            </div>
                          ))}
                          <IconButton
                            className={classes.iconInline}
                            onClick={() => arrayHelpers.push('')}
                          >
                            <AddLocationIcon />
                          </IconButton>
                          <IconButton
                            className={classes.iconInline}
                            onClick={() => arrayHelpers.push('')}
                          >
                            <AddIcon />
                          </IconButton>
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
                  size="large"
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  onClick={submitForm}
                >
                  Сохранить изменения
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  )
}
