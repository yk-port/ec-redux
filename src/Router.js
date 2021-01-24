import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, Login, Home } from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp}></Route>
      <Route exact path={"/login"} component={Login}></Route>

      <Auth>
        <Route exact path={"(/)?"} component={Home}></Route>
      </Auth>
    </Switch>
  )
}

export default Router;
