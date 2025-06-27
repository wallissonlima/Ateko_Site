import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
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
  _DeleteProduto,
  _getAllFornecedorProdutos,
  _getAllProdutos,
  _UpdateProduto,
} from "../../../services/produtos";
import iFornecedorProps from "../../../interfaces/fornecedor";
import { _getAllFornecedor } from "../../../services/fornecedor";

export const Produtos = () => {
  const [filter, setFilter] = useState("");
  const [registro, setRegistro] = useState<any>();
  const [filteredProdutos, setFilteredProdutos] = useState<iProdutoProps[]>([]);
  const [lstProduto, setLstProduto] = useState<iProdutoProps[]>([]);

  const [openCadastroProduto, setOpenCadastroProduto] =
    useState<boolean>(false);
  const [openDeleteProduto, setOpenDeleteProduto] = useState<boolean>(false);

  const [isEditProduto, setIsEditProduto] = useState(false);
  const [selectedProduto, setSelectedProduto] = useState<any>(null);
  const selectedFornecedor = useRef<any>();

  const toggleModal = (produto?: iProdutoProps) => {
    if (produto) {
      setIsEditProduto(true); // Modo edição
      setRegistroProduto(produto); // Preenche o formulário com os dados
    } else {
      setIsEditProduto(false); // Modo novo
      setRegistroProduto(null); // Limpa o formulário
    }
    setOpenCadastroProduto(true); // Abre o modal
  };

  //Filtra clientes para assim mostrar as fazendas
  const handleFilterChange = (e: any) => {
    const selectedName = e.target.value;
    setFilter(selectedName);

    const fornecedor = registro.find(
      (fornecedor: any) => fornecedor.nome === selectedName
    );

    if (fornecedor) {
      selectedFornecedor.current = fornecedor;

      // Atualiza os campos no estado do produto
      setRegistroProduto((prev) => ({
        ...prev,
        idLeverandor: fornecedor.objID,
        nome_fornecedor: fornecedor.nome,
      }));

      LoadingFornecedorProdutos(fornecedor.objID);
    } else {
      // Se nome inválido, limpa os dados do fornecedor no produto
      selectedFornecedor.current = null;

      setRegistroProduto((prev) => ({
        ...prev,
        idLeverandor: "",
        nome_fornecedor: "",
      }));
      setLstProduto([]);
      setFilteredProdutos([]);
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
  const LoadingFornecedorProdutos = async (IdFornecedor: string) => {
    try {
      const result = await _getAllFornecedorProdutos(IdFornecedor);
      if (result) {
        setLstProduto(result);
        setFilteredProdutos(result); // inicialmente, todos os produtos desse fornecedor
      } else {
        setLstProduto([]);
        setFilteredProdutos([]);
        toast.info("Nenhum produto cadastrado para o fornecedor selecionado.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
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

  //adicionar um novo produto
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Garante que vamos buscar o fornecedor com base no nome digitado no input
    const fornecedorSelecionado = registro.find((f: any) => f.nome === filter);

    if (!fornecedorSelecionado) {
      toast.error("Por favor, selecione um fornecedor válido da lista.", {
        autoClose: 2000,
      });
      return;
    }

    // Atualiza os campos antes de enviar
    const produtoParaEnviar = {
      ...registroProduto,
      idLeverandor: fornecedorSelecionado.objID,
      nome_fornecedor: fornecedorSelecionado.nome,
    };

    // Validação
    if (!produtoParaEnviar.nome_produto || !produtoParaEnviar.idLeverandor) {
      toast.error("Preencha todos os campos obrigatórios.", {
        autoClose: 2000,
      });

      return;
    }

    const result = await _createProduto(produtoParaEnviar);

    if (result) {
      setOpenCadastroProduto(false);
      setRegistroProduto({
        objID: "",
        nome_fornecedor: "",
        idLeverandor: "",
        nome_produto: "",
        tipo_produto: "",
        img: "",
      });
    }
  };

  // função para editar os produtos
  const handleEdit = async () => {
    // Garante que vamos buscar o fornecedor com base no nome digitado no input
    const fornecedorSelecionado = registro.find((f: any) => f.nome === filter);

    if (!fornecedorSelecionado) {
      toast.error("Por favor, selecione um fornecedor válido da lista.", {
        autoClose: 2000,
      });
      return;
    }

    // Atualiza os campos antes de enviar
    const produtoParaEnviar = {
      ...registroProduto,
      idLeverandor: fornecedorSelecionado.objID,
      nome_fornecedor: fornecedorSelecionado.nome,
    };
    try {
      const result = await _UpdateProduto(produtoParaEnviar);

      if (result) {
        toast.success("Fornecedor atualizado com sucesso!", {
          autoClose: 3000,
        });

        setOpenCadastroProduto(false); // Fecha o modal
        LoadingFornecedores(); // Recarrega a lista
      } else {
        toast.error("Erro ao atualizar fornecedor.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Erro ao atualizar fornecedor:", error);
      toast.error("Erro ao atualizar fornecedor.", { autoClose: 3000 });
    }
  };

  //Deleta produto
  const handleDelete = async () => {
    if (selectedProduto) {
      try {
        const result = await _DeleteProduto(selectedProduto.objID);
        if (result) {
          toast.success("Fornecedor deletado com sucesso!", {
            autoClose: 2000,
          });
          LoadingFornecedores();
        } else {
          toast.error("Erro ao deletar fornecedor.", { autoClose: 2000 });
        }
      } catch (error) {
        // console.log("Erro ao deletar fornecedor.", error);
      } finally {
        setOpenDeleteProduto(false); // Fecha o modal
        setSelectedProduto(null); // Limpa o fornecedor selecionado
      }
    }
  };
  //para confirmar que deletou
  const confirmarDeleteProduto = (produto: iProdutoProps) => {
    setSelectedProduto(produto);
    setOpenDeleteProduto(true);
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
                  return <option key={obj.objID} value={obj.nome} />;
                })}
              </datalist>
            </div>
          </Col>
          <Col lg="2">
            <div className="btn">
              <NewButton onClick={() => toggleModal()}>Novo Produto</NewButton>
            </div>
          </Col>
        </Row>
        <PageHeader />
        <CardProdutos
          produtos={filteredProdutos}
          onEditProduto={toggleModal}
          onDeleteProduto={confirmarDeleteProduto}
        />
      </Context>

      {/* Modal produtos */}
      <Modal
        isOpen={openCadastroProduto}
        toggle={() => setOpenCadastroProduto(!openCadastroProduto)}
        centered={true}
        size="lm"
      >
        <CustomModalHeader toggle={() => setOpenCadastroProduto(false)}>
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
              if (isEditProduto) {
                handleEdit(); // PUT ou PATCH
              } else {
                handleSubmit(e); // Chama a função de criação (POST)
              }
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

      {/*Modal messagem deletar cliente */}
      <Modal
        isOpen={openDeleteProduto}
        toggle={() => setOpenDeleteProduto(!openDeleteProduto)}
        centered={true}
        size="lm"
      >
        <ModalHeader
          style={{ background: "#8B0000" }}
          toggle={() => setOpenDeleteProduto(false)}
        >
          <h2
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Varsle!!
          </h2>
        </ModalHeader>
        {selectedProduto ? (
          <ModalBody>
            <h5>
              Vil du slette denne klienten?{" "}
              <b>{selectedProduto.nome_produto}</b>
            </h5>
          </ModalBody>
        ) : (
          <ModalBody>
            <h4>Laster...</h4>
          </ModalBody>
        )}
        <ModalFooter>
          <NewButton type="submit" onClick={handleDelete}>
            Bekrefte
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenDeleteProduto(!openDeleteProduto)}
          >
            Kansellere
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
};
