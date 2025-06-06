import auth from "../../util/authentication";

import { Login } from "./component";
import { Navigate } from "react-router-dom";

function NavLogin() {
  auth.check();
  const isLoggedIn = auth.isAuth;

  return <>{isLoggedIn ? <Navigate to="/inicio" /> : <Login />}</>;
}

export default NavLogin;
