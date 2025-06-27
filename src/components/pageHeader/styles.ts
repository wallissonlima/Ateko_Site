import styled from "styled-components";

export const Context = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px dashed ${(props) => props.theme["green-500"]};
`;
