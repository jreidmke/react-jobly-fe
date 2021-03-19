import React, { useContext } from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import UserContext from "./UserContext";

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function PrivateRoute({ exact, path, children }) {
  const { currUser } = useContext(UserContext);
  console.log(currUser);
  console.log(children);
  const history = useHistory();
  console.debug(
      "PrivateRoute",
      "exact=", exact,
      "path=", path,
      "currentUser=", currUser,
  );

  if (!currUser) {
    console.log("PZZZA")
    history.push('/');
    // return <Redirect to="/login" />;
  }

  return (
      <Route exact={exact} path={path}>
        {children}
      </Route>
  );
}

export default PrivateRoute;
