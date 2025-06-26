import {
  Card,
  CardHeader,
  CardText,
  CardTitle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding: 1rem;
`;

export const CustomCard = styled(Card)`
  border-radius: 10px;
  flex: 0 0 calc(33.33% - 6px); // 3 por linha com gap
  box-sizing: border-box;

  background-color: #f2f2f7;
  color: #000000;

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
`;

export const CustomDropdownMenu = styled(DropdownMenu)`
  background-color: white;
`;

export const CustomDropdownItem = styled(DropdownItem)`
  && {
    /* Adiciona especificidade extra */
    color: #000000;
    background-color: transparent;

    &:hover {
      color: white;
    }
  }

  &:hover {
    background-color: ${(props) =>
      props.theme["green-400"]}; /* Cor ao passar o mouse */
  }
`;
