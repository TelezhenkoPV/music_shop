import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from './changePasswordStyles'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import InputAdornment from '@material-ui/core/InputAdornment'
import LinearProgress from '@material-ui/core/LinearProgress'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import { changePassword } from '../../store/user/userActions'
import { closeModal } from '../../store/modal/modalAction'
import {
  getIsChangePasswordProceed,
  getChangePasswordError,
  getIsChangePasswordSuccessful,
} from '../../store/user/userSelectors'

const changePasswordSchema = Yup.object().shape({
  password: Yup.string()
    .required('Необходимо указать пароль')
    .min(7, 'Минимальная длина пароля 7 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Разрешенные символы: a-z, A-Z, 0-9'),
  newPassword: Yup.string()
    .required('Необходимо указать пароль')
    .min(7, 'Минимальная длина пароля 7 символов')
    .max(30, 'Максимальная длина пароля 30 символов')
    .matches(/^[a-zA-Z0-9]+$/, 'Разрешенные символы: a-z, A-Z, 0-9'),
  confirmPassword: Yup.string()
    .required('Необходимо подтвердить пароль')
    .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают'),
})

const initialValues = {
  password: '',
  newPassword: '',
  confirmPassword: '',
}

export default function ChangePassword() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const margin = useMediaQuery(useTheme().breakpoints.down('xs'))
    ? 'dense'
    : 'normal'
  const size = useMediaQuery(useTheme().breakpoints.down('xs'))
    ? 'small'
    : 'medium'

  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [submit, setSubmit] = useState({ isSubmitting: false })

  const isChangePasswordProceed = useSelector(getIsChangePasswordProceed)
  const changePasswordError = useSelector(getChangePasswordError)
  const isChangePasswordSuccessful = useSelector(getIsChangePasswordSuccessful)

  useEffect(() => {
    if (submit.isSubmitting && !isChangePasswordProceed) {
      submit.setSubmitting(false)
      setSubmit({ isSubmitting: false })
      submit.setErrors({ ...changePasswordError })
      if (isChangePasswordSuccessful) dispatch(closeModal())
    }
  }, [
    isChangePasswordProceed,
    changePasswordError,
    isChangePasswordSuccessful,
    submit,
    dispatch,
  ])

  const handleClose = () => {
    dispatch(closeModal())
  }

  const handleSubmit = (values, { setSubmitting, setErrors }) => {
    const changePasswordData = (({ confirmPassword, ...rest }) => rest)(values)
    dispatch(changePassword(changePasswordData))
    setSubmit({ isSubmitting: true, setSubmitting, setErrors })
  }

  return (
    <Container component="main" maxWidth="xs" className={classes.formWrapper}>
      <div className={classes.paper}>
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isValid, isSubmitting }) => (
            <Form className={classes.form}>
              <Field
                component={TextField}
                className={classes.marginBottomLast}
                variant="outlined"
                margin={margin}
                size={size}
                fullWidth
                id="password"
                name="password"
                label="Current password"
                required
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        disabled={isSubmitting}
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
                variant="outlined"
                margin={margin}
                size={size}
                fullWidth
                id="newPassword"
                name="newPassword"
                label="New password"
                required
                type={showNewPassword ? 'text' : 'password'}
                autoComplete="off"
                disabled={isSubmitting}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        disabled={isSubmitting}
                        tabIndex={-1}
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
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

              {isChangePasswordProceed ? (
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
                  color="primary"
                  disabled={!isValid || isSubmitting}
                  onClick={submitForm}
                >
                  Change password
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
