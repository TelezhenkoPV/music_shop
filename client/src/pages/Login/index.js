import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { loginUser } from '../../store/user/userActions'
import { isAuthenticatedSelector } from '../../store/user/userSelectors'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()

  const { state } = useLocation()

  const isAuthenticated = useSelector(isAuthenticatedSelector)

  const handleLogin = () => {
    dispatch(
      loginUser({
        loginOrEmail: 'mikhail.scherbina@gmail.com',
        password: '123456789',
      })
    )
  }

  if (isAuthenticated) {
    return <Redirect to={state?.from || '/'} />
  }

  return (
    <Container className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        disabled={isAuthenticated}
        onClick={handleLogin}
      >
        LogIn
      </Button>
    </Container>
  )
}

export default Login
