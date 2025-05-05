import {
    ButtonClose,
    Context,
    CustomDropdownItem,
    CustomDropdownMenu,
    CustomModalHeader,
    NewButton,
  } from './styles';
  import logoSigma from '../../assets/LogoSigma.png';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import {
    Collapse,
    DropdownToggle,
    Modal,
    ModalBody,
    ModalFooter,
    Nav,
    Navbar,
    NavbarBrand,
    NavItem,
    NavLink,
    UncontrolledDropdown,
  } from 'reactstrap';
  import { SignOut } from 'phosphor-react';
  import { useNavigate, useLocation } from 'react-router-dom';
  import { useState } from 'react';
  
  export function Header() {
    const [openUsuario, setOpenUsuario] = useState<boolean>(false);
  
    const navigate = useNavigate();
    const location = useLocation(); // Obter a rota atual
  
    const handleLogout = () => {
      localStorage.removeItem('access_token');
      navigate('/');
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
                  <NavLink href="#/inicio" className={location.pathname === '/inicio' ? 'active' : ''}>
                    Dashboards
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#/clientes" className={location.pathname === '/clientes' ? 'active' : ''}>
                    Clientes
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#/fazenda" className={location.pathname === '/fazenda' ? 'active' : ''}>
                    Fazenda
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#/avaliacao" className={location.pathname === '/avaliacao' ? 'active' : ''}>
                    Avaliação
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#/cultura" className={location.pathname === '/cultura' ? 'active' : ''}>
                    Cultura
                  </NavLink>
                </NavItem>
              </Nav>
              <div className="DropAdmin">
                <UncontrolledDropdown>
                  <DropdownToggle nav caret>
                    Administrador
                  </DropdownToggle>
                  <CustomDropdownMenu>
                    <CustomDropdownItem>Usuários</CustomDropdownItem>
                    <CustomDropdownItem divider />
                    <CustomDropdownItem onClick={() => setOpenUsuario(!openUsuario)}>
                      Cadastrar usuário
                    </CustomDropdownItem>
                    <CustomDropdownItem divider />
                    <CustomDropdownItem>Alterar senha</CustomDropdownItem>
                  </CustomDropdownMenu>
                </UncontrolledDropdown>
  
                <SignOut onClick={handleLogout} size={25} />
              </div>
            </Collapse>
          </Navbar>
        </Context>
  
        {/*Modal cadastro de usuario cliente */}
        <Modal isOpen={openUsuario} centered={true} size="lm">
          <CustomModalHeader>
            <h2 style={{ fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>Cadastro novo cliente</h2>
          </CustomModalHeader>
  
          <ModalBody>
            <h1>Conteúdo</h1>
          </ModalBody>
  
          <ModalFooter>
            <NewButton type="submit">Confirmar</NewButton>
            <ButtonClose type="button" onClick={() => setOpenUsuario(!openUsuario)}>
              cancelar
            </ButtonClose>
          </ModalFooter>
        </Modal>
      </>
    );
  }
  