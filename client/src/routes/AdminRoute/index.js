import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { isAdminSelector } from '../../store/user/userSelectors'

const AdminRoute = ({ children, ...rest }) => {
  const isAdmin = useSelector(isAdminSelector)

  return (
    <Route
      {...rest}
      render={({ location }) => {
        return isAdmin ? (
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

export default AdminRoute
