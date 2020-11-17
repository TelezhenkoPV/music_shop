import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import { makeStyles, useTheme } from '@material-ui/core/styles'
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

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formWrapper: {
    [theme.breakpoints.down('xs')]: {
      padding: '15px',
    },
  },
  form: {
    width: '100%',
  },
  textField: {
    '&>.MuiInputLabel-root': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
    '&>.MuiInputBase-root': {
      [theme.breakpoints.down('xs')]: {
        fontSize: '12px',
      },
    },
  },
  button: {
    margin: theme.spacing(1, 0, 1),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
      fontSize: '10px',
    },
  },
  marginBottom: {
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(2),
    },
  },
  marginBottomLast: {
    marginBottom: theme.spacing(2),
    [theme.breakpoints.down('xs')]: {
      marginBottom: theme.spacing(1),
    },
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

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Имя обязательно для заполнения')
    .min(2, 'Имя должно содержать как минимум 2 символа')
    .max(25, 'Длина имени не может быть больше 25 символов')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'Первый символ должен быть заглавный')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  lastName: Yup.string()
    .required('Фамилия обязательна для заполнения')
    .min(2, 'Фамилия должна содержать как минимум 2 символа')
    .max(25, 'Длина фамилии не может быть больше 25 символов')
    .matches(/^[А-ЯЁІЇЄ|A-Z]/, 'Первый символ должен быть заглавный')
    .matches(
      /^[А-ЯЁІЇЄ|A-Z][а-яёіїє'|a-z]*/,
      "'Разрешенные символы: a-zA-Zа-яА-ЯёiїєЁІЇЄ'"
    ),
  telephone: Yup.string().matches(
    /^\+380\d{3}\d{2}\d{2}\d{2}$/,
    'Используйте формат +380XXXXXXXXX'
  ),
  email: Yup.string()
    .required('Email обязательный для заполнения')
    .email('Адрес электронной почты введен некорректно'),
  login: Yup.string()
    .required('Логин обязательный для заполнения')
    .min(3, 'Логин должен содержать как минимум 3 символа')
    .max(10, 'Длина логина не может быть больше 10 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Разрешенные символы: a-z, A-Z, 0-9'),
  password: Yup.string()
    .required('Пароль обязательный для заполнения')
    .min(7, 'Минимальная длина пароля 7 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Разрешенные символы: a-z, A-Z, 0-9'),
  confirmPassword: Yup.string()
    .required('Необходимо подтвердить пароль')
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают'),
})

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
          validationSchema={SignUpSchema}
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
                label="Имя"
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
                label="Фамилия"
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
                label="Телефон"
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
                label="Логин"
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
                label="Пароль"
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
                label="Повторите пароль"
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
                Регистрация
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
