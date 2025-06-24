import { Card, CardHeader, CardText, CardTitle } from "reactstrap";
import styled from "styled-components";

export const Context = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
`;

export const CustomCard = styled(Card)`
  width: 20rem;
  border: 1px solid;
  border-radius: 8px;

  background-color: #f2f2f7;
  color: #000000;
`;
export const CustonCardHeader = styled(CardHeader)`
  display: flex;
  justify-content: center;

  background: ${(props) => props.theme["blue-300"]};
  font-weight: bold;
`;
export const CunstomCardTitle = styled(CardTitle)`
  display: flex;
  justify-content: center;

  font-weight: bold;
  color: ${(props) => props.theme["green-200"]};
`;

export const CustonCardText = styled(CardText)`
  display: flex;
  justify-content: center;
`;
