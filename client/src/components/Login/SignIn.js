import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'

import { makeStyles } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formWrapper: {
    padding: '15px',
  },
  form: {
    width: '100%',
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
  },
  marginBottomLast: {
    marginBottom: theme.spacing(2),
  },
  helperText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
    [theme.breakpoints.down('xs')]: {
      fontSize: '10px',
    },
  },
  devider: {
    margin: '3px 0 1px',
  },
}))

const SignInSchema = Yup.object().shape({
  loginOrEmail: Yup.string()
    .required('Необходимо указать Логин или Email')
    .min(3, 'Логин должен содержать как минимум 3 символа'),
  password: Yup.string()
    .required('Необходимо указать пароль')
    .min(7, 'Минимальная длина пароля 7 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Разрешенные символы: a-z, A-Z, 0-9'),
})

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
          validationSchema={SignInSchema}
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
                label="Логин или Email"
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
                label="Пароль"
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
                Label={{ label: 'Запомнить меня' }}
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
                  Выход{' '}
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
                  Вход
                </Button>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
