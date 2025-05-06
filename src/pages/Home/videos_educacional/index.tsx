import { Col, Row } from "reactstrap";
import { Context } from "./styles";
import { Header } from "../../../components/Header";

export function VideosEducacional() {
  return (
    <>
      <Header />
      <Context>
        <h1>Videos Educacional</h1>
        <Row className="mt-3">
          <Col md={12}>
            <h2>Videos Educacional</h2>
          </Col>
        </Row>
      </Context>
    </>
  );
}
