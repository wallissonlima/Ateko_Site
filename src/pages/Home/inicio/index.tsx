import { useEffect, useState } from "react";
import { Header } from "../../../components/Header";
import { FaEdit } from "react-icons/fa";
import { Trash } from "phosphor-react";
import {
  ButtonClose,
  Context,
  CustomModalHeader,
  NewButton,
  NewTransactionTable,
  TableRow,
  TransactionTable,
} from "./styles";
import iQuestionProps from "../../../interfaces/iQuestion";
import { toast } from "react-toastify";
import {
  _createQuestion,
  _DeleteQuestion,
  _findQuestion,
  _getAllQuestion,
  _UpdateQuestion,
} from "../../../services/question";
import {
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { CadQuestion } from "../../../operaction/Question";

import { v4 as uuidv4 } from "uuid";
import _ from "lodash";

export function Inicio() {
  const [lstQuestion, setLstQuestion] = useState<iQuestionProps[]>([]);
  const [openCadastroQuestion, setOpenCadastroQuestion] =
    useState<boolean>(false);
  const [openDeleteQuestion, setOpenDeleteQuestion] = useState<boolean>(false);

  const [isEditQuestion, setIsEditQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<any>(null);

  //registro os dados das fazendas
  const [registroQuestion, setRegistroQuestion] = useState<iQuestionProps>({
    objID: uuidv4(),
    questionTexts: "",
    importantQuestion: false,
  });

  //Função para trazer as perguntas
  const LoadingQuestion = async () => {
    try {
      const result = await _getAllQuestion(); // Nova função de requisição
      if (result) {
        setLstQuestion(result);
      } else {
        setLstQuestion([]); // Limpa a tabela se não houver fazendas para o cliente selecionado
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
    LoadingQuestion(); // Chama a função para carregar as perguntas
  }, []);

  //para criar uma nova pergunta
  const createQuestion = (e: any) => {
    const objeto: any = _.cloneDeep(registroQuestion);
    if (e.target.name === "importantQuestion") {
      objeto["importantQuestion"] = e.target.value === "true" ? true : false;
    } else {
      objeto[e.target.name] = e.target.value;
    }
    setRegistroQuestion(objeto);
  };

  //adicionar um nova perguta
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!registroQuestion.questionTexts) {
      toast.error("Vennligst fyll ut alle obligatoriske felt.", {
        autoClose: 3000,
      });
      return;
    }

    const result = await _createQuestion(registroQuestion);

    // Limpar o formulário
    setRegistroQuestion({
      objID: "",
      questionTexts: "",
      importantQuestion: false,
    });
    if (result) {
      LoadingQuestion();
      setOpenCadastroQuestion(false);
    }
  };

  //editar perguntas
  const handleEdit = async () => {
    try {
      const result = await _UpdateQuestion(registroQuestion); // Envia o estado `registro` para a API

      if (result) {
        // toast.success("Cliente atualizado com sucesso!");
        setOpenCadastroQuestion(false); // Fecha o modal após a atualização

        if (result) {
          LoadingQuestion();
          setOpenCadastroQuestion(false);
        }
      } else {
        toast.error("Feil ved innlasting av spørsmål.", { autoClose: 3000 });
      }
    } catch (error) {
      toast.error("Feil under oppdatering av spørsmål.", { autoClose: 3000 });
    }
  };
  //carregar os clietes para editar
  const loodingQuestion = async (e: any) => {
    setIsEditQuestion(true);
    // Encontre a linha (<tr>) mais próxima do elemento clicado
    const row = e.target.closest("tr");
    // Aqui você pode pegar os dados das células da linha, se necessário
    // Por exemplo, se cada célula tiver um dataset com informações relevantes
    const objID = row.querySelector(".objID").innerText;

    try {
      setOpenCadastroQuestion(true);
      const cliente = await _findQuestion(objID);
      if (cliente) {
        setRegistroQuestion((prevState) => ({
          ...prevState,
          objID: cliente.objID,
          questionTexts: cliente.questionTexts,
        }));
      } else {
        toast.info("Spørsmålet ble ikke funnet.", { autoClose: 2000 });
      }
    } catch (error) {
      toast.error("Feil ved innlasting av spørsmål.", { autoClose: 2000 });
    }
  };

  //Deleta clientes
  const handleDelete = async () => {
    if (selectedQuestion) {
      try {
        const result = await _DeleteQuestion(selectedQuestion.objID);
        if (result) {
          toast.success("Spørsmålet ble slettet!", { autoClose: 2000 });
          LoadingQuestion();
        } else {
          toast.error("Feil ved sletting av spørsmål.", { autoClose: 2000 });
        }
      } catch (error) {
        console.log("Erro ao deletar pergunta.", error);
      } finally {
        setOpenDeleteQuestion(false); // Fecha o modal
        setSelectedQuestion(null); // Limpa o cliente selecionado
      }
    }
  };
  //Modal Deletar
  const openDeleteModal = (e: any) => {
    const row = e.target.closest("tr");
    const objID = row.querySelector(".objID").innerText;

    // Localiza o cliente específico com base no objID
    const cliente = lstQuestion.find((c) => c.objID === objID);
    if (cliente) {
      setSelectedQuestion(cliente); // Define o cliente no estado
      setOpenDeleteQuestion(true); // Abre o modal
    }
  };
  return (
    <>
      <Header />
      <Context>
        <Row>
          <Col lg="6">
            <NewButton
              onClick={() => {
                setRegistroQuestion({
                  objID: uuidv4(),
                  questionTexts: "",
                  importantQuestion: false,
                });
                setOpenCadastroQuestion(!openCadastroQuestion);
                setIsEditQuestion(false);
              }}
            >
              Nytt spørsmål
            </NewButton>
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
                {lstQuestion.map((question, index) => (
                  <TableRow key={index}>
                    <td className="objID" hidden={true}>
                      {question.objID}
                    </td>
                    <td>{question.questionTexts}</td>
                    <td className="selectIcon">
                      {" "}
                      <FaEdit
                        size={23}
                        style={{
                          color: "hsl(120, 100%, 19.607843137254903%)",
                        }}
                        onClick={loodingQuestion}
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
        </Row>
      </Context>

      {/* Modal */}
      <Modal isOpen={openCadastroQuestion} centered={true} size="lm">
        <CustomModalHeader>
          <h2 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            {isEditQuestion
              ? `
              Rediger spørsmål `
              : `
              Registrer nytt spørsmål`}
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <CadQuestion dt={registroQuestion} up={createQuestion} />
        </ModalBody>
        <ModalFooter>
          <NewButton
            type="submit"
            onClick={(e: any) => {
              e.preventDefault(); // Evita que o formulário seja enviado
              if (isEditQuestion) {
                handleEdit(); // Chama a função de atualização (PUT)
              } else {
                handleSubmit(e); // Chama a função de criação (POST)
              }
            }}
          >
            {isEditQuestion ? `Berging` : `Register`}
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenCadastroQuestion(!openCadastroQuestion)}
          >
            Berging
          </ButtonClose>
        </ModalFooter>
      </Modal>

      {/*Modal messagem deletar cliente */}
      <Modal isOpen={openDeleteQuestion} centered={true} size="lm">
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
        {selectedQuestion ? (
          <ModalBody>
            <h5>
              Vil du slette denne klienten?{" "}
              <b>{selectedQuestion.questionTexts}</b>
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
            onClick={() => setOpenDeleteQuestion(!openDeleteQuestion)}
          >
            Kansellere
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
}
