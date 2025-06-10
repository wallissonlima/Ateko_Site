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

  h3 {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: bold;
    font-size: 1.7rem;
    margin: 0.5rem 0;
  }
  p {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1rem;
    margin: 0.5rem 0;
  }

  .selectIcon svg {
    transition: transform 0.2s ease;
  }

  .selectIcon svg:active {
    transform: scale(1.2);
  }
`;
