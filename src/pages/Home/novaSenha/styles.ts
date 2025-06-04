import { FormGroup } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100vh;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};
`;

export const CustomFormGrup = styled(FormGroup)`
  width: 100%;
  height: 7%;

  Input {
    border: 1px solid #000000;
    border-radius: 8px;
    width: 27rem;
    height: 100%;
  }
  div {
    display: flex;
    justify-content: end;
    padding: 2%;

    button {
      width: 110px;
      padding: 10px;
      margin-top: -2px;
      font-size: 1.2em;
      background: ${(props) => props.theme["green-300"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;
      border: none;
      border-radius: 15px;
      cursor: pointer;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
      &:not(:disabled):hover {
        background: ${(props) => props.theme["green-400"]};
        transition: background-color 0.2s;
      }
    }
  }
`;
