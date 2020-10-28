import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { tokenSelector, isAdminSelector } from '../../store/user/userSelectors'
import { getCustomer } from '../../store/user/userActions'

const AdminRoute = ({ children, ...rest }) => {
  const dispatch = useDispatch()
  const token = useSelector(tokenSelector)
  dispatch(getCustomer({ token }))

  const isAdmin = useSelector(isAdminSelector)
  console.log('isAdmin', isAdmin)

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
