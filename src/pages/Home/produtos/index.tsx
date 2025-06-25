import { Col, Modal, ModalBody, ModalFooter, Row } from "reactstrap";
import { Header } from "../../../components/Header";
import { PageHeader } from "../../../components/pageHeader";
import { CardProdutos } from "./card";
import {
  ButtonClose,
  Context,
  CustomModalHeader,
  NewButton,
  SelectContext,
} from "./styles";
import { useEffect, useRef, useState } from "react";
import iProdutoProps from "../../../interfaces/produto";
import { v4 as uuidv4 } from "uuid";
import { CadProduto } from "../../../operaction/Produto";
import { toast } from "react-toastify";
import {
  _createProduto,
  _getAllFornecedorProdutos,
  _getAllProdutos,
} from "../../../services/produtos";
import iFornecedorProps from "../../../interfaces/fornecedor";
import { _getAllFornecedor } from "../../../services/fornecedor";

export const Produtos = () => {
  const [filter, setFilter] = useState("");
  const [registro, setRegistro] = useState<any>();
  const [lstProduto, setLstProduto] = useState<iProdutoProps[]>([]);

  const [openCadastroProduto, setOpenCadastroProduto] =
    useState<boolean>(false);
  const [openDeleteProduto, setOpenDeleteProduto] = useState<boolean>(false);

  const [isEditProduto, setIsEditProduto] = useState(false);

  const selectedFornecedor = useRef<any>();

  //Filtra clientes para assim mostrar as fazendas
  const handleFilterChange = (e: any) => {
    const selectedName = e.target.value;
    setFilter(selectedName);
    if (selectedName) {
      // Encontra a fazenda com o nome selecionado
      selectedFornecedor.current = registro.find(
        (fornecedor: any) => fornecedor.nome === selectedName
      );

      LoadingFornecedorProdutos(selectedFornecedor.current.objID);
    } else {
      // Limpa os filtros e estados relacionados
      setRegistro([]);
      selectedFornecedor.current = null;
    }
  };

  //Função para trazer todos os forncedores
  const LoadingFornecedores = async () => {
    try {
      const result = await _getAllFornecedor(); // Nova função de requisição
      if (result) {
        setRegistro(result);
      } else {
        setRegistro([]); // Limpa a tabela se não houver fazendas para o cliente selecionado
        toast.info("Nenhum fornecedor cadastrado", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.error("Erro ao carregar fazendas do cliente:", error);
      toast.error("Erro ao carregar os fornecedores.", { autoClose: 1500 });
    }
  };
  useEffect(() => {
    LoadingFornecedores(); // Chama a função para carregar as perguntas
  }, []);

  // Função para carregar as fazendas de um cliente específico
  const LoadingFornecedorProdutos = async (IdFornecedor: any) => {
    try {
      const result = await _getAllFornecedorProdutos(IdFornecedor); // Nova função de requisição
      // console.log("Resposta da API de produtos:", result);
      if (result) {
        console.log(result);
        setRegistroProduto(result);
      } else {
        // Limpa a tabela se não houver fazendas para o cliente selecionado
        toast.info(
          "Nenhuma produto cadastrada para o fornecedor selecionado.",
          { autoClose: 2000 }
        );
      }
    } catch (error) {
      // console.error("Erro ao carregar fazendas do cliente:", error);
      toast.error("Erro ao carregar os produtos.", { autoClose: 1500 });
    }
  };

  //Função para trazer todos os forncedores
  const LoadingProdutos = async () => {
    try {
      const result = await _getAllProdutos(); // Nova função de requisição
      console.log(result);
      if (result) {
        setRegistro(result);
        setLstProduto(result);
      } else {
        setLstProduto([]); // Limpa a tabela se não houver fazendas para o cliente selecionado
        toast.info("Nenhum produto cadastrada", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.error("Erro ao carregar fazendas do cliente:", error);
      toast.error("Erro ao carregar os produtos.", { autoClose: 1500 });
    }
  };

  //registro os dados dos fornecedores
  const [registroProduto, setRegistroProduto] = useState<iProdutoProps>({
    objID: uuidv4(),
    nome_fornecedor: "",
    idLeverandor: "",
    nome_produto: "",
    tipo_produto: "",
    img: "",
  });

  //para criar uma nova pergunta
  const createProduto = (e: any) => {
    setRegistroProduto((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //adicionar um nova perguta
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!registroProduto.nome_produto) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        autoClose: 3000,
      });
      return;
    }
    const result = await _createProduto(registroProduto);

    // Limpar o formulário
    setRegistroProduto({
      objID: "",
      nome_fornecedor: "",
      idLeverandor: "",
      nome_produto: "",
      tipo_produto: "",
      img: "",
    });
    if (result) {
      // LoadingProduto();
      setOpenCadastroProduto(false);
    }
  };
  return (
    <>
      <Header />
      <Context>
        <Row>
          <Col lg="10">
            <div className="titulo">
              <h5>Fornecedor:</h5>
              <SelectContext
                list="statusOptions"
                value={filter || ""}
                onChange={handleFilterChange}
                placeholder="Digite ou selecione o fornecedor"
              />
              <datalist id="statusOptions">
                {registro?.map((obj: iFornecedorProps) => {
                  return <option key={obj.objID} value={`${obj.nome}`} />;
                })}
              </datalist>
            </div>
          </Col>
          <Col lg="2">
            <div className="btn">
              <NewButton
                onClick={() => {
                  setRegistroProduto({
                    objID: uuidv4(),
                    nome_fornecedor: "",
                    idLeverandor: "",
                    nome_produto: "",
                    tipo_produto: "",
                    img: "",
                  });
                  setOpenCadastroProduto(!openCadastroProduto);
                  setIsEditProduto(false);
                }}
              >
                Novo Produto
              </NewButton>
            </div>
          </Col>
        </Row>
        <PageHeader />
        <CardProdutos />
      </Context>

      {/* Modal */}
      <Modal isOpen={openCadastroProduto} centered={true} size="lm">
        <CustomModalHeader>
          <h2 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            {isEditProduto
              ? `
                    editar produto`
              : `
                    registrar novo produto`}
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <CadProduto dt={registroProduto} up={createProduto} />
        </ModalBody>
        <ModalFooter>
          <NewButton
            type="submit"
            onClick={(e: any) => {
              e.preventDefault(); // Evita que o formulário seja enviado

              handleSubmit(e); // Chama a função de criação (POST)
            }}
          >
            {isEditProduto ? `Berging` : `Register`}
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenCadastroProduto(!openCadastroProduto)}
          >
            Berging
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
};
