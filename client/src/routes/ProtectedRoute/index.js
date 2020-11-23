import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuthenticated, getIsAdmin } from '../../store/user/userSelectors'
import { openModal } from '../../store/modal/modalAction'
import Prohibited from '../../pages/Prohibited'
import Login from '../../components/Login'

const ProtectedRoute = ({ children, adminOnly = false, ...rest }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isAdmin = useSelector(getIsAdmin)

  if (!isAuthenticated) dispatch(openModal(<Login />))

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
          <Redirect to="/" />
        )
      }}
    />
  )
}

export default ProtectedRoute
