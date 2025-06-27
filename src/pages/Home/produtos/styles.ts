import { Button, ModalHeader } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};

  .titulo {
    display: flex;
    align-items: baseline;

    h5 {
      padding: 0 6px 0 0;
    }
  }
  .btn {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
  }
`;

export const SelectContext = styled.input`
  width: 14rem;
  height: 2.5rem;
  border-radius: 6px;
  margin-top: 1.1rem;

  option {
    background-color: white;
  }
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

export const CustomModalHeader = styled(ModalHeader)`
  background: ${(props) => props.theme.white};
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
