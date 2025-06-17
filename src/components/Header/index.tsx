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
          <NavbarBrand href="/inicio">
            <img src={logoSigma} alt="Logo Tipo" />
          </NavbarBrand>

          <Collapse navbar>
            <Nav>
              <NavItem>
                <NavLink
                  href="#/start"
                  className={location.pathname === "/start" ? "active" : ""}
                >
                  Start
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#/pedagogiskvideo"
                  className={
                    location.pathname === "/pedagogiskvideo" ? "active" : ""
                  }
                >
                  Pedagogisk video
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  href="#/videoinfo"
                  className={location.pathname === "/videoinfo" ? "active" : ""}
                >
                  Video info
                </NavLink>
              </NavItem>
            </Nav>
            <div className="DropAdmin">
              {/* <NavLink
                href="#/noticias"
                className={
                  location.pathname === "/noticias" ? "active" : ""
                }
              >
                Notícias
              </NavLink> */}
              <SignOut onClick={handleLogout} size={25} />
            </div>
          </Collapse>
        </Navbar>
      </Context>
    </>
  );
}
