import { Button, ModalHeader } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 100%;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};
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

export const NewTransactionTable = styled.div`
  max-height: 560px;
  overflow-y: auto;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-top: 1rem;
`;

export const TransactionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  th {
    position: sticky;
    top: 0;
    z-index: 10;
    background-color: ${(props) => props.theme["green-400"]};
    padding: 1rem;
    min-width: 5rem;
    text-align: left;
    color: ${(props) => props.theme.white};
    font-size: 0.875rem;
    line-height: 1.6;

    &:first-child {
      border-top-left-radius: 6px;
      padding-left: 1.5rem;
    }
    &:last-child {
      border-top-right-radius: 6px;
      padding-right: 1.5rem;
    }
    .icon {
      background: rebeccapurple;
    }
  }

  td {
    background-color: ${(props) => props.theme["gray-300"]};
    border-top: 4px solid ${(props) => props.theme["gray-100"]};
    padding: 0.86rem; //ajuste da largura da linha da tabela
    font-size: 0.875rem;
    line-height: 1.6;
    cursor: pointer;

    &:first-child {
      width: 50%;
      padding-left: 1.5rem;
    }
    &:last-child {
      padding-right: 1.5rem;
    }
  }
`;

export const TableRow = styled.tr`
  cursor: pointer;

  // Define a cor da linha selecionada
  &.selected {
    background-color: ${(props) => props.theme["gray-600"]} !important;

    // Adiciona cor ao fundo das células quando a linha está selecionada
    td {
      background-color: inherit; // Utiliza a cor de fundo do tr
      color: ${(props) =>
        props.theme.white}; // Define a cor do texto se necessário
    }
  }

  // Efeito hover
  &:hover {
    background-color: ${(props) =>
      props.theme["gray-600"]}; // Cor ao passar o mouse

    // Se a linha não estiver selecionada, aplica o efeito
    &:not(.selected) {
      td {
        background-color: inherit; // Mantém a cor de fundo da linha ao passar o mouse
      }
    }
  }

  .selectIcon svg {
    transition: transform 0.2s ease;
  }

  .selectIcon svg:active {
    transform: scale(1.2);
  }
`;

export const CustomModalHeader = styled(ModalHeader)`
  background: ${(props) => props.theme["green-400"]};
  
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

