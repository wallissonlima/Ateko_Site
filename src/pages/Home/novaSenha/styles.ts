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
  width: 30%;
  height: 7%;

  Input {
    border: 1px solid #000000;
    border-radius: 8px;
    width: 27rem;
    height: 100%;
  }
`;
