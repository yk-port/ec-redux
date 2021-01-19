import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Home } from './template';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/login"} component={Login}></Route>
      <Route exact path={"(/)?"} component={Home}></Route>
    </Switch>
  )
}

export default Router;
