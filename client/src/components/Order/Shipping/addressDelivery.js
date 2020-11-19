import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './addressDeliveryStyles'

import { Formik, Form, Field } from 'formik'
import { schemaOrderShippingAddress } from '../../../validation/schema'

import { TextField, RadioGroup } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import MenuItem from '@material-ui/core/MenuItem'

import {
  getIsAuthenticated,
  getUserData,
} from '../../../store/user/userSelectors'
import {
  getActiveStep,
  getIsAddressDeliverySet as getIsShippingSet,
  getAddressDeliveryData as getShippingData,
} from '../../../store/order/orderSelectors'

import {
  setActiveStep,
  saveShippingData,
} from '../../../store/order/orderActions'

export default function AddressDelivery() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const activeStep = useSelector(getActiveStep)

  // Data from store
  const isShippingSet = useSelector(getIsShippingSet)
  const shipping = useSelector(getShippingData)

  // Data from profile
  const isAuthenticated = useSelector(getIsAuthenticated)
  const { addressDelivery = [] } = useSelector(getUserData)
  const isProfileAddressExist = addressDelivery.length > 0

  const addressFromProfile = () => {
    const defProfileAddress = isProfileAddressExist
      ? addressDelivery.find((item) => item.isDefault)
      : null
    return (
      (isAuthenticated &&
        isProfileAddressExist &&
        defProfileAddress &&
        defProfileAddress.address) ||
      (isAuthenticated && isProfileAddressExist && addressDelivery[0]) ||
      ''
    )
  }

  const back = (submitForm) => {
    submitForm()
    dispatch(setActiveStep(activeStep - 1))
  }

  const next = (submitForm) => {
    submitForm()
    dispatch(setActiveStep(activeStep + 1))
  }

  const initialValues = isShippingSet
    ? shipping
    : {
        isAddressFromProfile:
          isAuthenticated && isProfileAddressExist ? 'true' : 'false',
        address: addressFromProfile(),
      }

  const handleSubmit = (values) => {
    dispatch(saveShippingData({ type: 'addressDelivery', data: values }))
  }

  const setAddressValue = (event, setFieldValue) => {
    const newValue = event.currentTarget.value
    setFieldValue('isAddressFromProfile', newValue)
    if (newValue === 'true') {
      setFieldValue('address', addressFromProfile())
    }
  }

  return (
    <div className={classes.root}>
      <Formik
        initialValues={initialValues}
        validationSchema={schemaOrderShippingAddress}
        onSubmit={handleSubmit}
      >
        {({ values, submitForm, isValid, isSubmitting, setFieldValue }) => (
          <Form className={classes.form}>
            <Field
              component={RadioGroup}
              id="isAddressFromProfile"
              name="isAddressFromProfile"
              classes={{ root: classes.radioGroup }}
              onChange={(event) => setAddressValue(event, setFieldValue)}
            >
              <FormControlLabel
                value="true"
                control={<Radio disabled={isSubmitting} />}
                label="My adresses"
                disabled={!isProfileAddressExist || isSubmitting}
              />
              <FormControlLabel
                value="false"
                control={<Radio disabled={isSubmitting} />}
                label="Other address"
                disabled={isSubmitting}
              />
            </Field>

            {values.isAddressFromProfile === 'true' ? (
              <Field
                component={TextField}
                type="text"
                id="address"
                name="address"
                label="My address"
                select
                variant="outlined"
                helperText="Please select address"
                margin="dense"
                size="small"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {isProfileAddressExist
                  ? addressDelivery.map((item) => (
                      <MenuItem key={item.address} value={item.address}>
                        {item.address}
                      </MenuItem>
                    ))
                  : null}
              </Field>
            ) : (
              <Field
                component={TextField}
                variant="outlined"
                margin="dense"
                size="small"
                fullWidth
                id="address"
                name="address"
                label="Other address"
                autoComplete="street-address"
                autoFocus
              />
            )}

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
          </Form>
        )}
      </Formik>
    </div>
  )
}
