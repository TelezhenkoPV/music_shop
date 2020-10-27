import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAuthenticatedSelector } from '../../store/user/userSelectors'

const ProtectedRoute = ({ children, isAdminOnly, ...rest }) => {
  const isAuthenticated = useSelector(isAuthenticatedSelector)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }}
    />
  )
}

export default ProtectedRoute
