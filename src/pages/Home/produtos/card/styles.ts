import { Card, CardHeader, DropdownItem, DropdownMenu } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  padding: 1rem;
`;

export const CustomCard = styled(Card)`
  border-radius: 10px;
  background-color: #f2f2f7;
  color: #000000;
  min-height: 300px; /* Altura mínima para evitar cards pequenos */
  display: flex;
  flex-direction: column;

  .selectIcon svg {
    transition: transform 0.2s ease;
  }

  .selectIcon svg:active {
    transform: scale(1.2);
  }
`;

export const CustonCardHeader = styled(CardHeader)`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
`;

export const CustomDropdownMenu = styled(DropdownMenu)`
  background-color: white;
`;

export const CustomDropdownItem = styled(DropdownItem)`
  && {
    color: #000000;
    background-color: transparent;

    &:hover {
      color: white;
      background-color: ${(props) => props.theme["green-400"]};
    }
  }
`;
