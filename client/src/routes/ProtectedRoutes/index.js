import React from 'react'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoutes = (props) => {
  const { ...rest } = props
  // replace with localStorage.getItem('token')
  const isAuthenticated = true

  return isAuthenticated ? (
    <Route {...rest} />
  ) : (
    <Redirect to={{ pathname: '/login' }} />
  )
}

export default ProtectedRoutes
