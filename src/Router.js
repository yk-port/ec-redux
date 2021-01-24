import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, SignIn, Home } from './templates';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp}></Route>
      <Route exact path={"/login"} component={SignIn}></Route>
      <Route exact path={"(/)?"} component={Home}></Route>
    </Switch>
  )
}

export default Router;
