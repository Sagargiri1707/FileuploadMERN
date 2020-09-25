import React, { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./component/PrivateRoute";
import Dashboard from "./pages/dashboard/dashboard.component";
import Header from "./component/header/header.component";
 
import "materialize-css/dist/css/materialize.css";
import "./App.css";
import Alert from "./component/alert/alert.component";
const Login = lazy(() =>
  import("./pages/login/login.component" /* webpackChunkName: "Login" */))
const Signup = lazy(() =>
  import("./pages/signup/signup.component" /* webpackChunkName: "Signup" */)
)
function App() {
  return (
    <>
      <Header />
      <Alert />
      <Suspense fallback={<div/>}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <PrivateRoute path="/" component={Dashboard} />
        </Switch>
      </Suspense>
      
    </>
  );
}

export default React.memo(App);
