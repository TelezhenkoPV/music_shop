import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { signIn, signOut } from '../../store/user/userActions'
import { closeModal } from '../../store/modal/modalAction'
import { getIsAuthenticated } from '../../store/user/userSelectors'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function SignIn() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    loginOrEmail: '',
    password: '',
    remember: false,
  })

  const handleChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setFormData({ ...formData, [event.target.name]: value })
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
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="loginOrEmail"
            label="Email Address"
            name="loginOrEmail"
            autoComplete="email"
            autoFocus
            value={formData.loginOrEmail}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
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
