import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import { loginUser, logoutUser } from '../../store/user/userActions'
import { getIsAuthenticated } from '../../store/user/userSelectors'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90%',
  },
}))

function Login() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)

  const handleClickAdmin = () => {
    isAuthenticated
      ? dispatch(logoutUser())
      : dispatch(
          loginUser({
            loginOrEmail: 'mikhail.scherbina@gmail.com',
            password: '123456789',
          })
        )
  }

  const handleClick = () => {
    isAuthenticated
      ? dispatch(logoutUser())
      : dispatch(
          loginUser({
            loginOrEmail: 'scherbina2@gmail.com',
            password: '123456789',
          })
        )
  }

  return (
    <Container className={classes.root}>
      <Button variant="contained" color="primary" onClick={handleClick}>
        {isAuthenticated ? 'LogOut' : 'LogIn'}
      </Button>
      <Button variant="contained" color="secondary" onClick={handleClickAdmin}>
        {isAuthenticated ? 'LogOut' : 'LogIn as Admin'}
      </Button>
    </Container>
  )
}

export default Login
