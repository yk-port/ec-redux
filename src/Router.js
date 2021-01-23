import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, Login, Home } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp}></Route>
      <Route exact path={"/login"} component={Login}></Route>
      <Route exact path={"(/)?"} component={Home}></Route>
    </Switch>
  )
}

export default Router;
