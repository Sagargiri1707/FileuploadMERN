import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Login from "./pages/login/login.component";
import Signup from "./pages/signup/signup.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Header from "./component/header/header.component";

import "materialize-css/dist/css/materialize.css";
import "./App.css";
import Alert from "./component/alert/alert.component";

function App() {
  return (
    <>
      <Header />
      <Alert />
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </>
  );
}

export default React.memo(App);
