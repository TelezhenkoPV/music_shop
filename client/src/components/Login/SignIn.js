import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Formik, Form, Field } from 'formik'
import { schemaSignIn } from '../../validation/schema'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'

import useStyles from './signInStyles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { signIn, signOut } from '../../store/user/userActions'
import { closeModal } from '../../store/modal/modalAction'
import {
  getIsAuthenticated,
  getIsSignInProceed,
  getSignInError,
} from '../../store/user/userSelectors'
import { notificate } from '../../store/notification/notificationActions'

const initialValues = {
  loginOrEmail: '',
  password: '',
  rememberMe: false,
}

export default function SignIn() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false)
  const [submit, setSubmit] = useState({ isSubmitting: false })

  const isAuthenticated = useSelector(getIsAuthenticated)
  const isSignInProceed = useSelector(getIsSignInProceed)
  const signInError = useSelector(getSignInError)

  useEffect(() => {
    if (submit.isSubmitting && !isSignInProceed) {
      submit.setSubmitting(false)
      setSubmit({ isSubmitting: false })

      if (signInError !== null) {
        submit.setErrors({ ...signInError })
        dispatch(
          notificate({
            variant: 'error',
            data: signInError,
            key: 'signInError',
          })
        )
      }

      if (isAuthenticated) {
        dispatch(
          notificate({
            variant: 'success',
            data: 'Authorized successfully.',
            key: 'signInSuccess',
          })
        )
        dispatch(closeModal())
      }
    }
  }, [isAuthenticated, isSignInProceed, signInError, submit, dispatch])

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    dispatch(signIn(values))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  const handleClickSignOut = () => {
    dispatch(signOut())
    dispatch(closeModal())
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={schemaSignIn}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isValid, isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                component={TextField}
                className={classes.marginBottom}
                variant="outlined"
                fullWidth
                id="loginOrEmail"
                name="loginOrEmail"
                label="Login or Email"
                required
                autoComplete="username email"
                autoFocus
                disabled={isAuthenticated}
                FormHelperTextProps={{
                  className: classes.helperText,
                }}
              />

              <Field
                component={TextField}
                className={classes.marginBottomLast}
                variant="outlined"
                fullWidth
                id="password"
                name="password"
                label="Password"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                disabled={isAuthenticated}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        disabled={isAuthenticated}
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
                component={CheckboxWithLabel}
                type="checkbox"
                name="rememberMe"
                color="primary"
                Label={{ label: 'Remember me' }}
                disabled={isAuthenticated}
              />

              {isSignInProceed ? (
                <LinearProgress />
              ) : (
                <Divider className={classes.devider} />
              )}

              {isAuthenticated ? (
                <Button
                  className={classes.button}
                  variant="contained"
                  fullWidth
                  color="primary"
                  onClick={handleClickSignOut}
                >
                  {' '}
                  SIGNOUT{' '}
                </Button>
              ) : (
                <Button
                  className={classes.button}
                  variant="contained"
                  fullWidth
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  onClick={submitForm}
                >
                  SIGNIN
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
