import { Context } from "./styles";
import logoSigma from "../../assets/AtekoLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from "reactstrap";
import { SignOut } from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation(); // Obter a rota atual

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
  };

  return (
    <>
      <Context>
        <Navbar>
          <NavbarBrand href="#/inicio">
            <img src={logoSigma} alt="Logo Tipo" />
          </NavbarBrand>

          <Collapse navbar>
            <Nav>
              <NavItem>
                <NavLink
                  href="#/inicio"
                  className={location.pathname === "/inicio" ? "active" : ""}
                >
                  Start
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="inicio"
                  className={location.pathname === "/teste" ? "active" : ""}
                >
                  teste
                </NavLink>
              </NavItem>
            </Nav>
            <div className="DropAdmin">
              <SignOut onClick={handleLogout} size={25} />
            </div>
          </Collapse>
        </Navbar>
      </Context>
    </>
  );
}
