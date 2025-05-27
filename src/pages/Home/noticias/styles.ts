import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};
`;