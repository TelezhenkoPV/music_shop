import React from 'react'
import { Route, Switch } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute'
import UserProfile from '../../pages/Protected/UserProfile'
import AdminPanel from '../../pages/AdminOnly/AdminPanel'
import Main from '../../pages/Main'
import NotFound from '../../pages/NotFound'
import Prohibited from '../../pages/Prohibited'
import Accessories from '../../pages/Accessories'
import Basket from '../../pages/Basket'
import PDP from '../../pages/PDP'
import PLP from '../../pages/PLP'
import AboutOurTeam from '../../pages/AboutOurTeam'
import FAQ from '../../pages/FAQ'
import Contacts from '../../pages/Contacts'

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/gitars" render={() => <PLP product={'gitars'} />} />
        <Route
          exact
          path="/booster"
          render={() => <PLP product={'booster'} />}
        />
        <Route
          exact
          path="/percussion"
          render={() => <PLP product={'percussion'} />}
        />
        <Route exact path="/bass" render={() => <PLP product={'bass'} />} />
        <Route
          exact
          path="/keybords"
          render={() => <PLP product={'keybords'} />}
        />
        <Route
          exact
          path="/about-us/about-our-team"
          render={() => <AboutOurTeam />}
        />
        <Route exact path="/about-us/faq" render={() => <FAQ />} />
        <Route exact path="/contacts/address" render={() => <Contacts />} />
        <Route
          exact
          path="/contacts/phone-number"
          render={() => <Contacts />}
        />
        <Route exact path="/contacts/email" render={() => <Contacts />} />
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
        <Route exact path="/accessories" render={() => <Accessories />} />
        <Route exact path="/basket" render={() => <Basket />} />
        <Route exact path="/product-details" render={() => <PDP />} />
        <Route exact path="/products-list" render={() => <PLP />} />

        <ProtectedRoute path="/protected">
          <UserProfile />
        </ProtectedRoute>
        <ProtectedRoute path="/admin" adminOnly>
          <AdminPanel />
        </ProtectedRoute>
        <Route exact path="/prohibited" render={() => <Prohibited />} />

        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
