import { CardBody, CardFooter } from "reactstrap";
import { Context } from "../../fornecedores/styles";
import { CustomCard, CustonCardHeader } from "./styles";

import { useEffect, useState } from "react";
import iFornecedorProps from "../../../../interfaces/fornecedor";
import { toast } from "react-toastify";
// import { _getAllFornecedorProdutos } from "../../../../services/produtos";

export const CardProdutos = () => {
  const [lstFornecedor, setLstfornecedor] = useState<iFornecedorProps[]>([]);

  //Função para trazer as perguntas
  // const LoadingProdutos = async () => {
  //   try {
  //     const result = await _getAllFornecedorProdutos(); // Nova função de requisição
  //     console.log("produtos", result);
  //     if (result) {
  //       setLstfornecedor(result);
  //     } else {
  //       setLstfornecedor([]); // Limpa a tabela se não houver fazendas para o cliente selecionado
  //       toast.info("Nenhuma pergunta cadastrada", {
  //         autoClose: 2000,
  //       });
  //     }
  //   } catch (error) {
  //     // console.error("Erro ao carregar fazendas do cliente:", error);
  //     toast.error("Erro ao carregar as perguntas.", { autoClose: 1500 });
  //   }
  // };
  // useEffect(() => {
  //   LoadingProdutos();
  // }, []);

  return (
    <Context>
      <CustomCard>
        <CustonCardHeader>produtos</CustonCardHeader>
        <CardBody>
          <h2>teste </h2>
        </CardBody>
        <CardFooter>
          <h2>teste footer</h2>
        </CardFooter>
      </CustomCard>
    </Context>
  );
};
