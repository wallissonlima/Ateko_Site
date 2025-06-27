import { useState, useCallback } from "react";
import { Context } from "./styles";
import logoSigma from "../../assets/AtekoLogo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { SignOut } from "phosphor-react";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/");
    closeMenu();
  };

  return (
    <Context>
      <NavbarBrand href="/start" onClick={closeMenu}>
        <img src={logoSigma} alt="Logo Tipo" />
      </NavbarBrand>
      <Navbar expand="md" light>
        <NavbarToggler onClick={toggle} className="me-2" />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="me-auto" navbar>
            <NavItem>
              <NavLink
                href="#/start"
                className={location.pathname === "/start" ? "active" : ""}
                onClick={closeMenu}
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
                onClick={closeMenu}
              >
                Pedagogisk video
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/videoinfo"
                className={location.pathname === "/videoinfo" ? "active" : ""}
                onClick={closeMenu}
              >
                Video info
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/fornecedores"
                className={
                  location.pathname === "/fornecedores" ? "active" : ""
                }
                onClick={closeMenu}
              >
                Fornecedores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                href="#/produtos"
                className={location.pathname === "/produtos" ? "active" : ""}
                onClick={closeMenu}
              >
                Produtos
              </NavLink>
            </NavItem>
          </Nav>
          <div className="DropAdmin">
            <SignOut onClick={handleLogout} size={25} />
          </div>
        </Collapse>
      </Navbar>
    </Context>
  );
}
