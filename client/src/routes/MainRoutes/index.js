import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../../pages/Main/index'
import NotFound from '../../pages/NotFound/index'
import Accessories from '../../pages/Accessories/index'
import Basket from '../../pages/Basket'
import PDP from '../../pages/PDP'
import PLP from '../../pages/PLP'

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
        <Route exact path="/accessories" render={() => <Accessories />} />
        <Route exact path="/basket" render={() => <Basket />} />
        <Route exact path="/product-details" render={() => <PDP />} />
        <Route exact path="/products-list" render={() => <PLP />} />
        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
