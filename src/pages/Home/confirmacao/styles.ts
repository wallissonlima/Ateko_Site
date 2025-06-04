import { FormGroup } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};
`;

export const CustomFormGrup = styled(FormGroup)`
  width: 100%;
  height: 7%;

  div {
    display: flex;
    justify-content: end;
    padding: 2%;

    button {
      width: 130px;
      padding: 10px;
      margin-top: -2px;
      font-size: 1.2em;
      background: ${(props) => props.theme["green-300"]};
      color: ${(props) => props.theme.white};
      font-weight: bold;

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
