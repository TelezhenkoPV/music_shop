import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import AdminRoute from '../AdminRoute'
import Main from '../../pages/Main'
import NotFound from '../../pages/NotFound'
import Gitars from '../../pages/Gitars'
import Login from '../../pages/Login'
import UserProfile from '../../pages/Protected/UserProfile'
import AdminPanel from '../../pages/AdminOnly/AdminPanel'

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/gitars" render={() => <Gitars />} />
        <Route exact path="/login" render={() => <Login />} />
        <ProtectedRoute path="/userprofile">
          <UserProfile />
        </ProtectedRoute>
        <AdminRoute path="/adminpanel">
          <AdminPanel />
        </AdminRoute>
        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
