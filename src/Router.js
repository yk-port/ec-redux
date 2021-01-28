import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp, Login, Reset, ProductEdit, ProductList } from './templates';
import Auth from './Auth';

const Router = () => {
  return (
    <Switch>
      <Route exact path={"/signup"} component={SignUp}></Route>
      <Route exact path={"/login"} component={Login}></Route>
      <Route exact path={"/reset"} component={Reset}></Route>

      <Auth>
        <Route exact path={"(/)?"} component={ProductList}></Route>
        {/* 正規表現を使って、/idがあればそのidに紐付いた画面を表示して、/idがなければ/product/editに該当する画面を表示する */}
        <Route path={"/product/edit(/:a)?"} component={ProductEdit}></Route>
      </Auth>
    </Switch>
  )
}

export default Router;
