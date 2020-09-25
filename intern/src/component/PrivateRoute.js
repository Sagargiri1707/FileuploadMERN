import React, { useContext } from "react";
import context from "../context/Context";
import { Route, Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, ...props }) {
  const { isloggedIn } = useContext(context);

  return (
    <Route
      {...props}
      render={(prop) =>
        isloggedIn ? (
          <Component {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: prop.location,
              },
            }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
