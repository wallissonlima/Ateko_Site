import auth from "../../util/authentication";

import { Login } from "./component";
import { Navigate } from "react-router-dom";

function NavLogin() {
  auth.check();
  const isLoggedIn = auth.isAuth;

  return <>{isLoggedIn ? <Navigate to="/start" /> : <Login />}</>;
}

export default NavLogin;
