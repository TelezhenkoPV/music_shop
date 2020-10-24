import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Main from '../../pages/Main/index'
import NotFound from '../../pages/NotFound/index'
import Gitars from '../../pages/Gitars/index'

const MainRoutes = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Main />} />
        <Route exact path="/gitars" render={() => <Gitars />} />
        <Route exact path="*" render={() => <NotFound />} />
      </Switch>
    </>
  )
}

export default MainRoutes
