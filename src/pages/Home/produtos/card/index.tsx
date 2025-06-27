import {
  Button,
  CardBody,
  CardFooter,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

import {
  Context,
  CustomCard,
  CustomDropdownItem,
  CustomDropdownMenu,
  CustonCardHeader,
} from "./styles";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { _getAllProdutos } from "../../../../services/produtos";
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
  const [lstProduto, setLstProduto] = useState<iProdutoProps[]>([]);

  //Função para trazer todos os produtos
  const LoadingProdutos = async () => {
    try {
      const result = await _getAllProdutos();
      if (result) {
        setLstProduto(result);
      } else {
        setLstProduto([]);
        toast.info("Nenhum produto cadastrado", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Erro ao carregar os produtos.", { autoClose: 1500 });
    }
  };

  useEffect(() => {
    LoadingProdutos();
  }, []);

  return (
    <Context>
      {produtos.length === 0 && (
        <p>Nenhum produto para o fornecedor selecionado.</p>
      )}

      {produtos.map((produto) => (
        <CustomCard key={produto.objID}>
          <CustonCardHeader>
            {produto.img && (
              <img
                src={produto.img}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            )}
          </CustonCardHeader>
          <CardBody>
            <p>
              <b>Nome do produto:</b> {produto.nome_produto}
            </p>
            <p>
              <b>Tipo:</b> {produto.tipo_produto}
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
                  <CustomDropdownItem onClick={() => onEditProduto(produto)}>
                    Editar
                  </CustomDropdownItem>
                  <CustomDropdownItem divider />
                  <CustomDropdownItem onClick={() => onDeleteProduto(produto)}>
                    Deleta
                  </CustomDropdownItem>
                </CustomDropdownMenu>
              </UncontrolledDropdown>
            </div>
          </CardFooter>
        </CustomCard>
      ))}
    </Context>
  );
};
