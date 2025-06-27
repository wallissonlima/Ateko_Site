import {
  CardBody,
  CardFooter,
  DropdownToggle,
  UncontrolledDropdown,
  Row,
  Col,
} from "reactstrap";

import {
  Context,
  CustomCard,
  CustomDropdownItem,
  CustomDropdownMenu,
  CustonCardHeader,
} from "./styles";

import iProdutoProps from "../../../../interfaces/produto";
import { Gear } from "phosphor-react";

interface CardProdutosProps {
  produtos: iProdutoProps[];
  onEditProduto: (produto: iProdutoProps) => void;
  onDeleteProduto: (produto: iProdutoProps) => void;
}

export const CardProdutos = ({
  produtos,
  onEditProduto,
  onDeleteProduto,
}: CardProdutosProps) => {
  return (
    <Context>
      {produtos.length === 0 && (
        <p>Ingen produkter for den valgte leverandøren.</p>
      )}

      <Row>
        {produtos.map((produto) => (
          <Col xs="12" sm="12" md="4" key={produto.objID} className="mb-3">
            <CustomCard>
              <CustonCardHeader>
                {produto.img && (
                  <img
                    src={produto.img}
                    alt={produto.nome_produto}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                )}
              </CustonCardHeader>
              <CardBody>
                <p>
                  <b>Produktnavn:</b> {produto.nome_produto}
                </p>
                <p>
                  <b>Type:</b> {produto.tipo_produto}
                </p>
              </CardBody>
              <CardFooter className="selectIcon">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <UncontrolledDropdown>
                    <DropdownToggle nav caret>
                      <Gear
                        size={30}
                        style={{
                          color: "hsl(120, 100%, 19.607843137254903%)",
                        }}
                      />
                    </DropdownToggle>
                    <CustomDropdownMenu>
                      <CustomDropdownItem
                        onClick={() => onEditProduto(produto)}
                      >
                        Rediger
                      </CustomDropdownItem>
                      <CustomDropdownItem divider />
                      <CustomDropdownItem
                        onClick={() => onDeleteProduto(produto)}
                      >
                        Slett
                      </CustomDropdownItem>
                    </CustomDropdownMenu>
                  </UncontrolledDropdown>
                </div>
              </CardFooter>
            </CustomCard>
          </Col>
        ))}
      </Row>
    </Context>
  );
};
