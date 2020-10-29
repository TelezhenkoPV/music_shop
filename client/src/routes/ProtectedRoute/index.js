import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsAuthenticated, getIsAdmin } from '../../store/user/userSelectors'
import Prohibited from '../../pages/Prohibited'

const ProtectedRoute = ({ children, adminOnly = false, ...rest }) => {
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isAdmin = useSelector(getIsAdmin)

  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? (
          adminOnly ? (
            isAdmin ? (
              children
            ) : (
              <Prohibited />
            )
          ) : (
            children
          )
        ) : (
          <Redirect to="/login" />
        )
      }}
    />
  )
}

export default ProtectedRoute
