import React, { useEffect } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { checkToken } from '../../store/user/userActions'
import ProtectedRoute from '../ProtectedRoute'
import UserProfile from '../../pages/Protected/UserProfile'
import AdminPanel from '../../pages/AdminOnly/AdminPanel'
import Main from '../../pages/Main'
import NotFound from '../../pages/NotFound'
import Prohibited from '../../pages/Prohibited'
import Basket from '../../pages/Basket'
import PDP from '../../pages/PDP'
import PLP from '../../pages/PLP'
import AboutOurTeam from '../../pages/AboutOurTeam'
import FAQ from '../../pages/FAQ'
import Contacts from '../../pages/Contacts'
import OrderCheckout from '../../pages/OrderCheckout'

const MainRoutes = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(checkToken())
  })

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />

        <Route exact path="/products/:params" render={() => <PLP />} />

        <Route exact path="/product/:id" render={() => <PDP />} />

        <Route
          exact
          path="/about-us/about-our-team"
          render={() => <AboutOurTeam />}
        />
        <Route exact path="/about-us/faq" render={() => <FAQ />} />
        <Route exact path="/contacts" render={() => <Contacts />} />
        <Route
          exact
          path="/popular-tags/guitar"
          render={() => <PLP product={'guitar'} />}
        />
        <Route
          exact
          path="/popular-tags/keyboards"
          render={() => <PLP product={'keyboards'} />}
        />
        <Route
          exact
          path="/popular-tags/drums"
          render={() => <PLP product={'drums'} />}
        />
        <Route
          exact
          path="/popular-tags/accessories"
          render={() => <PLP product={'accessories'} />}
        />
        <Route
          exact
          path="/accessories"
          render={() => <PLP product={'accessories'} />}
        />
        <Route exact path="/basket" render={() => <Basket />} />
        <Route exact path="/product-details" render={() => <PDP />} />
        <Route exact path="/products-list" render={() => <PLP />} />
        <Route exact path="/checkout" render={() => <OrderCheckout />} />
        <ProtectedRoute path="/customer/profile/:slug">
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/customer/profile">
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute exact path="/admin" adminOnly>
          <AdminPanel />
        </ProtectedRoute>
        <Route exact path="/prohibited" render={() => <Prohibited />} />

        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
