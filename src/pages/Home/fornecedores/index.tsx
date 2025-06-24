import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Header } from "../../../components/Header";
import {
  ButtonClose,
  Context,
  CustomModalHeader,
  NewButton,
  NewTransactionTable,
  TableRow,
  TransactionTable,
} from "./styles";
import { PageHeader } from "../../../components/pageHeader";
import iFornecedorProps from "../../../interfaces/fornecedor";
import {
  _createFornecedor,
  _DeleteFornecedor,
  _findFornecedor,
  _getAllFornecedor,
  _UpdateFornecedor,
} from "../../../services/fornecedor";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { Trash } from "phosphor-react";
import { CadFornecedor } from "../../../operaction/Fornecedor";
import { v4 as uuidv4 } from "uuid";

export function Fornecedores() {
  const [lstFornecedor, setLstfornecedor] = useState<iFornecedorProps[]>([]);
  const [openCadastroFornecedor, setOpenCadastroFornecedor] =
    useState<boolean>(false);
  const [openDeleteFornecedor, setOpenDeleteFornecedor] =
    useState<boolean>(false);

  const [isEditFornecedor, setIsEditFornecedor] = useState(false);
  const [selectedFornecedor, setSelectedFornecedor] = useState<any>(null);

  //registro os dados dos fornecedores
  const [registroFornecedor, setRegistroFornecedor] =
    useState<iFornecedorProps>({
      objID: uuidv4(),
      nome: "",
      email: "",
      contato: "",
      tipo_distribuicao: "",
    });

  //Função para trazer todos os forncedores
  const LoadingFornecedores = async () => {
    try {
      const result = await _getAllFornecedor(); // Nova função de requisição
      console.log(result);
      if (result) {
        setLstfornecedor(result);
      } else {
        setLstfornecedor([]); // Limpa a tabela se não houver fazendas para o cliente selecionado
        toast.info("Nenhuma pergunta cadastrada", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.error("Erro ao carregar fazendas do cliente:", error);
      toast.error("Erro ao carregar as perguntas.", { autoClose: 1500 });
    }
  };
  useEffect(() => {
    LoadingFornecedores(); // Chama a função para carregar as perguntas
  }, []);

  //para criar uma nova pergunta
  const createFornecedor = (e: any) => {
    setRegistroFornecedor((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //adicionar um nova perguta
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!registroFornecedor.nome) {
      toast.error("Por favor, preencha todos os campos obrigatórios.", {
        autoClose: 3000,
      });
      return;
    }
    const result = await _createFornecedor(registroFornecedor);

    // Limpar o formulário
    setRegistroFornecedor({
      objID: "",
      nome: "",
      email: "",
      contato: "",
      tipo_distribuicao: "",
    });
    if (result) {
      LoadingFornecedores();
      setOpenCadastroFornecedor(false);
    }
  };

  //editar perguntas
  const handleEdit = async () => {
    try {
      const result = await _UpdateFornecedor(registroFornecedor); // Envia o estado `registro` para a API

      if (result) {
        // toast.success("Cliente atualizado com sucesso!");
        setOpenCadastroFornecedor(false); // Fecha o modal após a atualização

        if (result) {
          LoadingFornecedores();
          setOpenCadastroFornecedor(false);
        }
      } else {
        toast.error("Erro ao atualizar cliente.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Erro ao atualizar cliente:", error);
      toast.error("Erro ao atualizar cliente.", { autoClose: 3000 });
    }
  };

  //carregar os clietes para editar
  const loodingFornecedor = async (e: any) => {
    setIsEditFornecedor(true);
    // Encontre a linha (<tr>) mais próxima do elemento clicado
    const row = e.target.closest("tr");
    // Aqui você pode pegar os dados das células da linha, se necessário
    // Por exemplo, se cada célula tiver um dataset com informações relevantes
    const objID = row.querySelector(".objID").innerText;

    try {
      setOpenCadastroFornecedor(true);
      const fornecedor = await _findFornecedor(objID);
      if (fornecedor) {
        setRegistroFornecedor((prevState) => ({
          ...prevState,
          objID: fornecedor.objID,
          nome: fornecedor.nome,
          email: fornecedor.email,
          contato: fornecedor.contato,
          tipo_distribuicao: fornecedor.tipo_distribuicao,
        }));
        console.log(fornecedor);
      } else {
        toast.info("Pergunta não encontrado.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Erro ao carregar Pergunta:", error);
      toast.error("Erro ao carregar o Pergunta.", { autoClose: 2000 });
    }
  };

  //Deleta fornecedores
  const handleDelete = async () => {
    if (selectedFornecedor) {
      try {
        const result = await _DeleteFornecedor(selectedFornecedor.objID);
        if (result) {
          toast.success("Fornecedor deletado com sucesso!", {
            autoClose: 2000,
          });
          LoadingFornecedores();
        } else {
          toast.error("Erro ao deletar fornecedor.", { autoClose: 2000 });
        }
      } catch (error) {
        console.log("Erro ao deletar fornecedor.", error);
      } finally {
        setOpenDeleteFornecedor(false); // Fecha o modal
        setSelectedFornecedor(null); // Limpa o fornecedor selecionado
      }
    }
  };
  //Modal Deletar
  const openDeleteModal = (e: any) => {
    const row = e.target.closest("tr");
    const objID = row.querySelector(".objID").innerText;

    // Localiza o fornecedor específico com base no objID
    const fornecedor = lstFornecedor.find((c) => c.objID === objID);
    if (fornecedor) {
      setSelectedFornecedor(fornecedor); // Define o cliente no estado
      setOpenDeleteFornecedor(true); // Abre o modal
    }
  };

  return (
    <>
      <Header />
      <Context>
        <NewButton
          onClick={() => {
            setRegistroFornecedor({
              objID: uuidv4(),
              nome: "",
              email: "",
              contato: "",
              tipo_distribuicao: "",
            });
            setOpenCadastroFornecedor(!openCadastroFornecedor);
            setIsEditFornecedor(false);
          }}
        >
          Novo fornecedor
        </NewButton>
        <PageHeader />
        <NewTransactionTable>
          <TransactionTable className="table table-striped">
            <thead>
              <tr>
                <th hidden={true}>objID</th>
                <th>nome</th>
                <th>email</th>
                <th>contato</th>
                <th>tipo_distribuicao</th>
                <th>editar</th>
                <th>Deletar</th>
              </tr>
            </thead>
            <tbody>
              {lstFornecedor.map((fornecedor, index) => (
                <TableRow key={index}>
                  <td className="objID" hidden={true}>
                    {fornecedor.objID}
                  </td>
                  <td>{fornecedor.nome}</td>
                  <td>{fornecedor.email}</td>
                  <td>{fornecedor.contato}</td>
                  <td>{fornecedor.tipo_distribuicao}</td>
                  <td className="selectIcon">
                    {" "}
                    <FaEdit
                      size={23}
                      style={{
                        color: "hsl(120, 100%, 19.607843137254903%)",
                      }}
                      onClick={loodingFornecedor}
                    />
                  </td>
                  <td className="selectIcon">
                    <Trash
                      size={23}
                      color="#7A1921"
                      onClick={openDeleteModal}
                    />
                  </td>
                </TableRow>
              ))}
            </tbody>
          </TransactionTable>
        </NewTransactionTable>
      </Context>

      {/* Modal */}
      <Modal isOpen={openCadastroFornecedor} centered={true} size="lm">
        <CustomModalHeader>
          <h2 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            {isEditFornecedor
              ? `
              Rediger spørsmål `
              : `
              Registrer nytt spørsmål`}
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <CadFornecedor dt={registroFornecedor} up={createFornecedor} />
        </ModalBody>
        <ModalFooter>
          <NewButton
            type="submit"
            onClick={(e: any) => {
              e.preventDefault(); // Evita que o formulário seja enviado
              if (isEditFornecedor) {
                handleEdit(); // Chama a função de atualização (PUT)
              } else {
                handleSubmit(e); // Chama a função de criação (POST)
              }
            }}
          >
            {isEditFornecedor ? `Berging` : `Register`}
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenCadastroFornecedor(!openCadastroFornecedor)}
          >
            Berging
          </ButtonClose>
        </ModalFooter>
      </Modal>

      {/*Modal messagem deletar cliente */}
      <Modal isOpen={openDeleteFornecedor} centered={true} size="lm">
        <ModalHeader style={{ background: "#8B0000" }}>
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
        {selectedFornecedor ? (
          <ModalBody>
            <h5>
              Vil du slette denne klienten?{" "}
              <b>{selectedFornecedor.questionTexts}</b>
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
            onClick={() => setOpenDeleteFornecedor(!openDeleteFornecedor)}
          >
            Kansellere
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
}
