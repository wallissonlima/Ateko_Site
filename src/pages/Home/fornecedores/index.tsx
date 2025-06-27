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

  // registrerer dataene til leverandørene
  const [registroFornecedor, setRegistroFornecedor] =
    useState<iFornecedorProps>({
      objID: uuidv4(),
      nome: "",
      email: "",
      contato: "",
      tipo_distribuicao: "",
    });

  // Funksjon for å hente alle leverandører
  const LoadingFornecedores = async () => {
    try {
      const result = await _getAllFornecedor(); // Ny forespørselsfunksjon
      if (result) {
        setLstfornecedor(result);
      } else {
        setLstfornecedor([]); // Tømmer tabellen hvis det ikke finnes leverandører for den valgte kunden
        toast.info("Ingen leverandører registrert", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.error("Feil ved lasting av leverandører for kunden:", error);
      toast.error("Feil ved lasting av leverandører.", { autoClose: 1500 });
    }
  };
  useEffect(() => {
    LoadingFornecedores(); // Kaller funksjonen for å laste leverandørene
  }, []);

  // for å opprette en ny leverandør
  const createFornecedor = (e: any) => {
    setRegistroFornecedor((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // legge til en ny leverandør
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!registroFornecedor.nome) {
      toast.error("Vennligst fyll ut alle obligatoriske felt.", {
        autoClose: 3000,
      });
      return;
    }
    const result = await _createFornecedor(registroFornecedor);

    // Tøm skjemaet
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

  // redigere leverandør
  const handleEdit = async () => {
    try {
      const result = await _UpdateFornecedor(registroFornecedor); // Sender tilstanden `registro` til API-et

      if (result) {
        // toast.success("Kunde oppdatert med suksess!");
        setOpenCadastroFornecedor(false); // Lukker modalen etter oppdateringen

        if (result) {
          LoadingFornecedores();
          setOpenCadastroFornecedor(false);
        }
      } else {
        toast.error("Feil ved oppdatering av kunde.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Feil ved oppdatering av kunde:", error);
      toast.error("Feil ved oppdatering av kunde.", { autoClose: 3000 });
    }
  };

  // laste leverandør for redigering
  const loodingFornecedor = async (e: any) => {
    setIsEditFornecedor(true);
    // Finn nærmeste rad (<tr>) til det klikkede elementet
    const row = e.target.closest("tr");
    // Her kan du hente data fra cellene i raden, om nødvendig
    // For eksempel, hvis hver celle har et datasett med relevant informasjon
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
      } else {
        toast.info("Leverandør ikke funnet.", { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Feil ved lasting av leverandør:", error);
      toast.error("Feil ved lasting av leverandør.", { autoClose: 2000 });
    }
  };

  // Slette leverandører
  const handleDelete = async () => {
    if (selectedFornecedor) {
      try {
        const result = await _DeleteFornecedor(selectedFornecedor.objID);
        if (result) {
          toast.success("Leverandør slettet med suksess!", {
            autoClose: 2000,
          });
          LoadingFornecedores();
        } else {
          toast.error("Feil ved sletting av leverandør.", { autoClose: 2000 });
        }
      } catch (error) {
        // console.log("Feil ved sletting av leverandør.", error);
      } finally {
        setOpenDeleteFornecedor(false); // Lukker modalen
        setSelectedFornecedor(null); // Tømmer den valgte leverandøren
      }
    }
  };
  // Modal Slette
  const openDeleteModal = (e: any) => {
    const row = e.target.closest("tr");
    const objID = row.querySelector(".objID").innerText;

    // Lokaliser den spesifikke leverandøren basert på objID
    const fornecedor = lstFornecedor.find((c) => c.objID === objID);
    if (fornecedor) {
      setSelectedFornecedor(fornecedor); // Setter leverandøren i tilstanden
      setOpenDeleteFornecedor(true); // Åpner modalen
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
          Ny leverandør
        </NewButton>
        <PageHeader />
        <NewTransactionTable>
          <TransactionTable className="table table-striped">
            <thead>
              <tr>
                <th hidden={true}>objID</th>
                <th>navn</th>
                <th>e-post</th>
                <th>kontakt</th>
                <th>distribusjonstype</th>
                <th>rediger</th>
                <th>Slett</th>
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
              ? `Rediger leverandør`
              : `Registrer ny leverandør`}
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <CadFornecedor dt={registroFornecedor} up={createFornecedor} />
        </ModalBody>
        <ModalFooter>
          <NewButton
            type="submit"
            onClick={(e: any) => {
              e.preventDefault(); // Hindrer at skjemaet sendes
              if (isEditFornecedor) {
                handleEdit(); // Kaller oppdateringsfunksjonen (PUT)
              } else {
                handleSubmit(e); // Kaller opprettelsesfunksjonen (POST)
              }
            }}
          >
            {isEditFornecedor ? `Lagre` : `Registrer`}
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenCadastroFornecedor(!openCadastroFornecedor)}
          >
            Avbryt
          </ButtonClose>
        </ModalFooter>
      </Modal>

      {/* Modal melding slette leverandør */}
      <Modal isOpen={openDeleteFornecedor} centered={true} size="lm">
        <ModalHeader style={{ background: "#8B0000" }}>
          <h2
            style={{
              color: "white",
              fontWeight: "bold",
              fontFamily: "Arial, sans-serif",
            }}
          >
            Advarsel!!
          </h2>
        </ModalHeader>
        {selectedFornecedor ? (
          <ModalBody>
            <h5>
              Vil du slette denne leverandøren? <b>{selectedFornecedor.nome}</b>
            </h5>
          </ModalBody>
        ) : (
          <ModalBody>
            <h4>Laster...</h4>
          </ModalBody>
        )}
        <ModalFooter>
          <NewButton type="submit" onClick={handleDelete}>
            Bekreft
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenDeleteFornecedor(!openDeleteFornecedor)}
          >
            Avbryt
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
}
