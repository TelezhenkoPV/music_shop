import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './styles'

import { Formik, Form, Field, useFormikContext } from 'formik'
import { schemaOrderCustomer } from '../../../validation/schema'

import { TextField } from 'formik-material-ui'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import { Typography } from '@material-ui/core'
import Button from '@material-ui/core/Button'

import {
  getIsAuthenticated,
  getUserData,
} from '../../../store/user/userSelectors'
import {
  getActiveStep,
  getIsCustomerSet,
  getCustomerData,
} from '../../../store/order/orderSelectors'

import {
  setActiveStep,
  saveCustomerData,
} from '../../../store/order/orderActions'

const UpdateValueAuth = () => {
  const { setValues } = useFormikContext()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isCustomerSet = useSelector(getIsCustomerSet)
  const customer = useSelector(getCustomerData)
  const {
    firstName = '',
    lastName = '',
    middleName = '',
    telephone = '+380',
    email = '',
    _id,
  } = useSelector(getUserData)

  useEffect(() => {
    if (isCustomerSet) {
      console.log('Customer already SET:', customer)
      setValues({ ...customer, customerId: null })
    } else {
      if (isAuthenticated) {
        setValues({
          firstName,
          lastName,
          middleName,
          telephone,
          email,
          customerId: _id,
        })
      }
    }
  }, [
    isCustomerSet,
    isAuthenticated,
    customer,
    firstName,
    lastName,
    middleName,
    telephone,
    email,
    _id,
    setValues,
  ])
  return null
}

export default function Customer() {
  // export default function Customer({ activeStep, actions: { back, next } }) {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)

  const back = (submitForm) => {
    submitForm()
    dispatch(setActiveStep(activeStep - 1))
  }

  const next = (submitForm) => {
    submitForm()
    dispatch(setActiveStep(activeStep + 1))
  }

  const initialValues = {
    firstName: '',
    lastName: '',
    middleName: '',
    telephone: '+380',
    email: '',
    customerId: null,
  }

  const handleSubmit = (values) => {
    dispatch(saveCustomerData(values))
  }

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <Divider className={classes.titleDivider} variant="middle" />
        <Typography>Customer information</Typography>
        <Divider className={classes.titleDivider} variant="middle" />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={schemaOrderCustomer}
        onSubmit={handleSubmit}
      >
        {({ submitForm, isValid, isSubmitting }) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
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
                  autoComplete="name family-name"
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
                  FormHelperTextProps={{
                    className: classes.helperText,
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
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
                  label="Email"
                  autoComplete="email"
                  FormHelperTextProps={{
                    className: classes.helperText,
                  }}
                />

                <Field
                  component={TextField}
                  className={classes.marginBottom}
                  classes={{ root: classes.textField }}
                  variant="outlined"
                  margin="dense"
                  size="small"
                  fullWidth
                  required
                  id="telephone"
                  name="telephone"
                  label="Telephone"
                  autoComplete="tel"
                  FormHelperTextProps={{
                    className: classes.helperText,
                  }}
                />
              </Grid>
            </Grid>

            <div className={classes.actions}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={activeStep === 0}
                onClick={() => back(submitForm)}
                className={classes.button}
              >
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={!isValid || isSubmitting}
                onClick={() => next(submitForm)}
                className={classes.button}
              >
                Next
              </Button>
            </div>

            <UpdateValueAuth />
          </Form>
        )}
      </Formik>
    </div>
  )
}

// const MyField = (props) => {
//   const isAuthenticated = useSelector(getIsAuthenticated)
//   const data = useSelector(getUserData)
//   console.log('userData!!!',data )

//   const {
//     setFieldValue,
//   } = useFormikContext();
//   const [field] = useField(props);

//   useEffect(() => {
//     if (isAuthenticated) {
//       console.log('SetValues!!!',props.name, data[props.name] )
//       data[props.name] && setFieldValue(props.name, data[props.name]);
//     }
//   },[isAuthenticated, data, setFieldValue, props.name])

//   return (
//     <>
//       <Field {...props} {...field} />
//     </>
//   )
// }
