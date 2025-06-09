import { Link } from "react-router-dom";
import styled from "styled-components";

export const Card = styled(Link)`
  display: block;
  text-decoration: none;
  color: ${(props) => props.theme["gray-100"]};
`;

export const Thumbnail = styled.img`
  width: 100%;
`;

export const Title = styled.h2`
  margin: 0.5rem 0 0;
`;

export const Channel = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: gray;
`;
