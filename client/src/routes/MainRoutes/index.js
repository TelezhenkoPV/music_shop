import React from 'react'
import { Route, Switch } from 'react-router-dom'
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
import * as staticNames from '../../util/staticNames'

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route
          exact
          path="/gitars"
          render={() => (
            <PLP
              title={staticNames.guitar.name}
              product={staticNames.guitar.product}
              description={staticNames.guitar.text}
            />
          )}
        />
        <Route
          exact
          path="/booster"
          render={() => (
            <PLP
              title={staticNames.booster.name}
              product={staticNames.booster.product}
              description={staticNames.booster.text}
            />
          )}
        />
        <Route
          exact
          path="/percussion"
          render={() => (
            <PLP
              title={staticNames.percussion.name}
              product={staticNames.percussion.product}
              description={staticNames.percussion.text}
            />
          )}
        />
        <Route
          exact
          path="/bass"
          render={() => (
            <PLP
              title={staticNames.bass.name}
              product={staticNames.bass.product}
              description={staticNames.bass.text}
            />
          )}
        />
        <Route
          exact
          path="/keybords"
          render={() => (
            <PLP
              title={staticNames.keybords.name}
              product={staticNames.keybords.product}
              description={staticNames.keybords.text}
            />
          )}
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
        <Route
          exact
          path="/accessories"
          render={() => <PLP product={'accessories'} />}
        />
        <Route exact path="/basket" render={() => <Basket />} />
        <Route exact path="/product-details" render={() => <PDP />} />
        <Route exact path="/products-list" render={() => <PLP />} />

        <ProtectedRoute exact path="/customer/profile">
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
