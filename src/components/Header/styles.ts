import { Button, DropdownItem, DropdownMenu, ModalHeader } from "reactstrap";
import styled from "styled-components";

export const Context = styled.nav`
  width: 100%;
  padding-right: 0.5rem;
  background-color: ${(props) => props.theme["green-300"]};

  img {
    width: 7rem;
  }

  .navbar {
    display: flex;
    flex-wrap: nowrap;
  }

  .navbar-collapse {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .nav-link {
    font-weight: bold;
    color: white;
    &:hover {
      color: #000000;
    }
  }

  .DropAdmin {
    display: flex; /* Alinha os elementos horizontalmente */
    align-items: center; /* Centraliza os elementos verticalmente */
    gap: 1rem; /* Espaço entre "Administrador" e o ícone */
    margin-left: auto; /* Empurra o grupo para a extrema direita */
    color: white;
  }

  .DropAdmin svg {
    cursor: pointer; /* Adiciona cursor para o ícone */
    transition: transform 0.2s ease;
  }

  .DropAdmin svg:hover {
    transform: scale(1.1); /* Efeito ao passar o mouse no ícone */
  }

  .active {
    color: #000000; /* Exemplo de cor para destaque */
  }
`;

export const CustomDropdownMenu = styled(DropdownMenu)`
  background-color: white;
`;

export const CustomDropdownItem = styled(DropdownItem)`
  && {
    /* Adiciona especificidade extra */
    color: #000000;
    background-color: transparent;

    &:hover {
      color: white;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.theme["green-400"]}; /* Cor ao passar o mouse */
  }
`;

export const CustomModalHeader = styled(ModalHeader)`
  background: ${(props) => props.theme["green-400"]};
`;

export const NewButton = styled(Button)`
  background: ${(props) => props.theme["green-300"]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: ${(props) => props.theme["green-400"]};
    transition: background-color 0.2s;
  }
`;
export const ButtonClose = styled(Button)`
  background: ${(props) => props.theme["red-400"]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  &:not(:disabled):hover {
    background: ${(props) => props.theme["red-500"]};
    transition: background-color 0.2s;
  }
`;
