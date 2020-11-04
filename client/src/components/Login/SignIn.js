import React, { useState } from 'react'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { signIn, signOut } from '../../store/user/userActions'
import { closeModal } from '../../store/modal/modalAction'
import { getIsAuthenticated } from '../../store/user/userSelectors'
import * as validate from '../../validation'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    // marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    marginBottom: theme.spacing(1),
  },
}))

export default function SignIn() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    loginOrEmail: '',
    password: '',
    showPassword: false,
    remember: false,
    errors: [],
  })

  const handleChange = (prop) => (event) => {
    const value = event.target.value
    const error = validate(value)
    setFormData({ ...formData, [prop]: event.target.value, errors: error })
  }

  const handleBlur = (prop) => (event) => {
    const error = validate.required(event.target.value)
    setFormData({ ...formData, errors: { ...formData.errors, [prop]: error } })
  }

  const handleClickShowPassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const handleClickRemember = () => {
    setFormData({ ...formData, remember: !formData.remember })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(signIn(formData))
    dispatch(closeModal())
  }

  // Только для теста - на Проде удалить
  const isAuthenticated = useSelector(getIsAuthenticated)
  const handleClickSignOut = () => {
    dispatch(signOut())
    dispatch(closeModal())
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            className={clsx(classes.margin)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="loginOrEmail"
            label="Логин или Почта"
            name="loginOrEmail"
            autoComplete="username email"
            autoFocus
            value={formData.loginOrEmail}
            onChange={handleChange('loginOrEmail')}
            onBlur={handleBlur('loginOrEmail')}
            helperText={formData.errors.loginOrEmail}
            error={formData.errors.loginOrEmail !== null}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type={formData.showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange('password')}
            helperText="Это обязательное поле"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {formData.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            // onChange={handleChange('password')}
            // onBlur={handleBlur('password')}
            // helperText={formData.errors.password}
            // error = {formData.errors.password !== null}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember}
                onChange={handleClickRemember}
                color="primary"
              />
            }
            label="Запомнить меня"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Вход
          </Button>

          {/* Только для теста - на Проде удалить */}
          {isAuthenticated ? (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleClickSignOut}
            >
              {' '}
              Выход{' '}
            </Button>
          ) : null}
        </form>
      </div>
    </Container>
  )
}
