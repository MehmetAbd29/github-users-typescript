import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type PrivateRouteProps = {
  children: React.ReactNode;
  path: string;
  exact?: boolean;
};

function PrivateRoute({ children, ...rest }: PrivateRouteProps): JSX.Element {
  const { isAuthenticated, user } = useAuth0();
  const isUser = isAuthenticated && user;

  return (
    <Route
      {...rest}
      render={() => {
        return isUser ? children : <Redirect to="/login" />;
      }}
    ></Route>
  );
}

export default PrivateRoute;
