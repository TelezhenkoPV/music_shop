import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Formik, Form, Field } from 'formik'
import { schemaSignUp } from '../../validation/schema'
import { TextField } from 'formik-material-ui'

import useStyles from './signUpStyles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { signUp } from '../../store/user/userActions'
import { closeModal } from '../../store/modal/modalAction'
import { notificate } from '../../store/notification/notificationActions'

import {
  getIsSignUpProceed,
  getSignUpError,
  getIsSignUpSuccessful,
} from '../../store/user/userSelectors'

const initialValues = {
  firstName: '',
  lastName: '',
  telephone: '380',
  email: '',
  login: '',
  password: '',
  confirmPassword: '',
}

export default function SignUp() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const margin = useMediaQuery(useTheme().breakpoints.down('xs'))
    ? 'dense'
    : 'normal'
  const size = useMediaQuery(useTheme().breakpoints.down('xs'))
    ? 'small'
    : 'medium'

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [submit, setSubmit] = useState({ isSubmitting: false })

  const isSignUpSuccessful = useSelector(getIsSignUpSuccessful)
  const isSignUpProceed = useSelector(getIsSignUpProceed)
  const signUpError = useSelector(getSignUpError)

  useEffect(() => {
    if (submit.isSubmitting && !isSignUpProceed) {
      submit.setSubmitting(false)
      setSubmit({ isSubmitting: false })
      if (signUpError !== null) {
        submit.setErrors({ ...signUpError })
        dispatch(
          notificate({
            variant: 'error',
            data: signUpError,
            key: 'signUpError',
          })
        )
      }

      if (isSignUpSuccessful) {
        dispatch(
          notificate({
            variant: 'success',
            data: 'Registered succsessfully.',
            key: 'signUpSuccess',
          })
        )
        dispatch(closeModal())
      }
    }
  }, [isSignUpSuccessful, isSignUpProceed, signUpError, submit, dispatch])

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const sigUpData = (({ confirmPassword, ...rest }) => rest)(values)
    dispatch(signUp(sigUpData))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaSignUp}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isValid, isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                component={TextField}
                className={classes.marginBottom}
                classes={{ root: classes.textField }}
                margin={margin}
                size={size}
                variant="outlined"
                fullWidth
                id="firstName"
                name="firstName"
                label="First name"
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
                margin={margin}
                size={size}
                variant="outlined"
                fullWidth
                id="lastName"
                name="lastName"
                label="Last name"
                required
                autoComplete="name family-name"
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottom}
                classes={{ root: classes.textField }}
                margin={margin}
                size={size}
                variant="outlined"
                fullWidth
                id="telephone"
                name="telephone"
                label="Phone"
                autoComplete="tel"
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottom}
                classes={{ root: classes.textField }}
                margin={margin}
                size={size}
                variant="outlined"
                fullWidth
                id="email"
                name="email"
                label="Email"
                required
                autoComplete="email"
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottom}
                classes={{ root: classes.textField }}
                margin={margin}
                size={size}
                variant="outlined"
                fullWidth
                id="login"
                name="login"
                label="Login"
                required
                autoComplete="username"
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottom}
                classes={{ root: classes.textField }}
                variant="outlined"
                margin={margin}
                size={size}
                fullWidth
                id="password"
                name="password"
                label="Password"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        tabIndex={-1}
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottomLast}
                classes={{ root: classes.textField }}
                variant="outlined"
                margin={margin}
                size={size}
                fullWidth
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                required
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="off"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        tabIndex={-1}
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              {isSignUpProceed ? (
                <LinearProgress />
              ) : (
                <Divider className={classes.devider} />
              )}

              <Button
                className={classes.button}
                variant="contained"
                fullWidth
                color="primary"
                disabled={!isValid || isSubmitting}
                onClick={submitForm}
              >
                SignUp
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
