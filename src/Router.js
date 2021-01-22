import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Home } from './templates';
import { LoginContainer } from './containers';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/login"} component={LoginContainer}></Route>
      {/* <Route exact path={"/login"} component={Login}></Route> */}
      <Route exact path={"(/)?"} component={Home}></Route>
    </Switch>
  )
}

export default Router;
