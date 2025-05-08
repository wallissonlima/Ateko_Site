import { Col, Row } from "reactstrap";
import {
  Context,
  NewButton,
  NewTransactionTable,
  TableRow,
  TransactionTable,
} from "./styles";
import { Header } from "../../../components/Header";
import { FaEdit } from "react-icons/fa";
import { Trash } from "phosphor-react";

export function VideosEducacional() {
  return (
    <>
      <Header />
      <Context>
        <Row>
          <Col md={12}>
            <NewButton>Carregar novo video</NewButton>
          </Col>

          <NewTransactionTable>
            <TransactionTable className="table table-striped">
              <thead>
                <tr>
                  <th hidden={true}>objID</th>
                  <th>Question</th>
                  <th>Redigere</th>
                  <th>Slett</th>
                </tr>
              </thead>
              <tbody>
                <TableRow>
                  <td className="objID" hidden={true}>
                    question
                  </td>
                  <td>Question</td>
                  <td className="selectIcon">
                    {" "}
                    <FaEdit
                      size={23}
                      style={{
                        color: "hsl(120, 100%, 19.607843137254903%)",
                      }}
                    />
                  </td>
                  <td className="selectIcon">
                    <Trash size={23} color="#7A1921" />
                  </td>
                </TableRow>
              </tbody>
            </TransactionTable>
          </NewTransactionTable>
        </Row>
      </Context>
    </>
  );
}
