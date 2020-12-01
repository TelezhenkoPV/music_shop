import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getIsAuthenticated, getIsAdmin } from '../../store/user/userSelectors'
import { openModal, closeModal } from '../../store/modal/modalAction'
import Prohibited from '../../pages/Prohibited'
import Login from '../../components/Login'

const ProtectedRoute = ({ children, adminOnly = false, ...rest }) => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const isAdmin = useSelector(getIsAdmin)

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(openModal(<Login />))
    } else {
      dispatch(closeModal())
    }
  }, [dispatch, isAuthenticated, isAdmin])

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
        ) : null
        // <Redirect to="/" />
      }}
    />
  )
}

export default ProtectedRoute
