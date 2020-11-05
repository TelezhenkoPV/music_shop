import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField, CheckboxWithLabel } from 'formik-material-ui'

import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    minWidth: '320px',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginBottom: {
    marginBottom: theme.spacing(5),
  },
  marginBottomLast: {
    marginBottom: theme.spacing(2),
  },
  helperText: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    transform: 'translateY(100%)',
  },
}))

const SignInSchema = yup.object().shape({
  loginOrEmail: yup.string().required('Это поле обязательно для заполнения'),
  password: yup
    .string()
    .required('Это поле обязательно для заполнения')
    .min(6, 'Минимальная длина пароля 6 символов'),
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
      submit.setErrors({ ...signInError })
      if (isAuthenticated) dispatch(closeModal())
    }
  }, [isAuthenticated, isSignInProceed, signInError, submit, dispatch])

  const handleSubmit = (values, { setSubmitting, setErrors, ...rest }) => {
    dispatch(signIn(values))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  const handleClickSignOut = () => {
    dispatch(signOut())
    dispatch(closeModal())
  }

  return (
    <Container component="main" maxWidth="xs">
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
                label="Логин или Почта"
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
                className={classes.marginBottomLast}
                type="checkbox"
                name="rememberMe"
                color="primary"
                Label={{ label: 'Запомнить меня' }}
                disabled={isAuthenticated}
              />

              {isSignInProceed && <LinearProgress />}

              {isAuthenticated ? (
                <Button
                  className={classes.marginLR}
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
                  className={classes.marginLR}
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
