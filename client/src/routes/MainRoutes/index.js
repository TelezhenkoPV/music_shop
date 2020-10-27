import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../../pages/Main/index'
import NotFound from '../../pages/NotFound/index'
import Gitars from '../../pages/Gitars/index'
import Basket from '../../pages/Basket'
import PDP from '../../pages/PDP'
import PLP from '../../pages/PLP'

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/gitars" render={() => <Gitars />} />
        <Route exact path="/basket" render={() => <Basket />} />
        <Route exact path="/product-details" render={() => <PDP />} />
        <Route exact path="/products-list" render={() => <PLP />} />
        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
