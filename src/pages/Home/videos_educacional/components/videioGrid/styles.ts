import styled from "styled-components";

export const Context = styled.div`
  width: 100%;
  min-height: 92vh;
  overflow-y: none;
  padding: 1rem;

  background: ${(props) => props.theme["gray-100"]};
`;

export const Grid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 10px;

  & > * {
    flex: 1 1 300px; // mínimo de 300px, cresce conforme o espaço
    max-width: 100%;
  }
`;
