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
      setIsEditProduto(true); // Modus redigering
      setRegistroProduto(produto); // Fyller skjemaet med data
    } else {
      setIsEditProduto(false); // Modus ny
      setRegistroProduto(null); // Tømmer skjemaet
    }
    setOpenCadastroProduto(true); // Åpner modalen
  };

  // Filtrerer leverandører for å vise produktene
  const handleFilterChange = (e: any) => {
    const selectedName = e.target.value;
    setFilter(selectedName);

    const fornecedor = registro.find(
      (fornecedor: any) => fornecedor.nome === selectedName
    );

    if (fornecedor) {
      selectedFornecedor.current = fornecedor;

      // Oppdaterer feltene i produktets tilstand
      setRegistroProduto((prev) => ({
        ...prev,
        idLeverandor: fornecedor.objID,
        nome_fornecedor: fornecedor.nome,
      }));

      LoadingFornecedorProdutos(fornecedor.objID);
    } else {
      // Hvis ugyldig navn, tøm leverandørdata i produktet
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

  // Funksjon for å hente alle leverandører
  const LoadingFornecedores = async () => {
    try {
      const result = await _getAllFornecedor(); // Ny forespørselsfunksjon
      if (result) {
        setRegistro(result);
      } else {
        setRegistro([]); // Tømmer tabellen hvis det ikke finnes leverandører for den valgte kunden
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

  // Funksjon for å laste produktene til en spesifikk leverandør
  const LoadingFornecedorProdutos = async (IdFornecedor: string) => {
    try {
      const result = await _getAllFornecedorProdutos(IdFornecedor);
      if (result) {
        setLstProduto(result);
        setFilteredProdutos(result); // i utgangspunktet alle produkter fra denne leverandøren
      } else {
        setLstProduto([]);
        setFilteredProdutos([]);
        toast.info("Ingen produkter registrert for den valgte leverandøren.", {
          autoClose: 2000,
        });
      }
    } catch (error) {
      toast.error("Feil ved lasting av produkter.", { autoClose: 1500 });
    }
  };

  // registrerer dataene til produktene
  const [registroProduto, setRegistroProduto] = useState<iProdutoProps>({
    objID: uuidv4(),
    nome_fornecedor: "",
    idLeverandor: "",
    nome_produto: "",
    tipo_produto: "",
    img: "",
  });

  // for å opprette et nytt produkt
  const createProduto = (e: any) => {
    setRegistroProduto((prevState: any) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // legge til et nytt produkt
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Sikrer at vi henter leverandøren basert på navnet skrevet i input
    const fornecedorSelecionado = registro.find((f: any) => f.nome === filter);

    if (!fornecedorSelecionado) {
      toast.error("Vennligst velg en gyldig leverandør fra listen.", {
        autoClose: 2000,
      });
      return;
    }

    // Oppdaterer feltene før sending
    const produtoParaEnviar = {
      ...registroProduto,
      idLeverandor: fornecedorSelecionado.objID,
      nome_fornecedor: fornecedorSelecionado.nome,
    };

    // Validering
    if (!produtoParaEnviar.nome_produto || !produtoParaEnviar.idLeverandor) {
      toast.error("Fyll ut alle obligatoriske felt.", {
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

      LoadingFornecedorProdutos(produtoParaEnviar.idLeverandor);
    }
  };

  // funksjon for å redigere produkter
  const handleEdit = async () => {
    // Sikrer at vi henter leverandøren basert på navnet skrevet i input
    const fornecedorSelecionado = registro.find((f: any) => f.nome === filter);

    if (!fornecedorSelecionado) {
      toast.error("Vennligst velg en gyldig leverandør fra listen.", {
        autoClose: 2000,
      });
      return;
    }

    // Oppdaterer feltene før sending
    const produtoParaEnviar = {
      ...registroProduto,
      idLeverandor: fornecedorSelecionado.objID,
      nome_fornecedor: fornecedorSelecionado.nome,
    };
    try {
      const result = await _UpdateProduto(produtoParaEnviar);

      if (result) {
        toast.success("Produkt oppdatert med suksess!", {
          autoClose: 3000,
        });

        setOpenCadastroProduto(false); // Lukker modalen
        LoadingFornecedorProdutos(produtoParaEnviar.idLeverandor);
        LoadingFornecedores(); // Laster listen på nytt
      } else {
        toast.error("Feil ved oppdatering av produkt.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error("Feil ved oppdatering av produkt:", error);
      toast.error("Feil ved oppdatering av produkt.", { autoClose: 3000 });
    }
  };

  // Slette produkt
  const handleDelete = async () => {
    if (selectedProduto) {
      // Sikrer at vi henter leverandøren basert på navnet skrevet i input
      const fornecedorSelecionado = registro.find(
        (f: any) => f.nome === filter
      );

      try {
        const result = await _DeleteProduto(selectedProduto.objID);
        if (result) {
          toast.success("Produkt slettet med suksess!", {
            autoClose: 2000,
          });
          LoadingFornecedores();
          LoadingFornecedorProdutos(fornecedorSelecionado.objID);
        } else {
          toast.error("Feil ved sletting av produkt.", { autoClose: 2000 });
        }
      } catch (error) {
        // console.log("Feil ved sletting av produkt.", error);
      } finally {
        setOpenDeleteProduto(false); // Lukker modalen
        setSelectedProduto(null); // Tømmer det valgte produktet
      }
    }
  };
  // for å bekrefte sletting
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
              <h5>Leverandør:</h5>
              <SelectContext
                list="statusOptions"
                value={filter || ""}
                onChange={handleFilterChange}
                placeholder="Skriv eller velg leverandør"
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
              <NewButton
                onClick={() => toggleModal()}
                disabled={!selectedFornecedor.current}
              >
                Nytt Produkt
              </NewButton>
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

      {/* Modal produkter */}
      <Modal
        isOpen={openCadastroProduto}
        toggle={() => setOpenCadastroProduto(!openCadastroProduto)}
        centered={true}
        size="lm"
      >
        <CustomModalHeader toggle={() => setOpenCadastroProduto(false)}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            {isEditProduto ? `Rediger produkt` : `Registrer nytt produkt`}
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <CadProduto dt={registroProduto} up={createProduto} />
        </ModalBody>
        <ModalFooter>
          <NewButton
            type="submit"
            onClick={(e: any) => {
              e.preventDefault(); // Hindrer at skjemaet sendes
              if (isEditProduto) {
                handleEdit(); // PUT eller PATCH
              } else {
                handleSubmit(e); // Kaller opprettelsesfunksjonen (POST)
              }
            }}
          >
            {isEditProduto ? `Lagre` : `Registrer`}
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenCadastroProduto(!openCadastroProduto)}
          >
            Avbryt
          </ButtonClose>
        </ModalFooter>
      </Modal>

      {/* Modal melding slette produkt */}
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
            Advarsel!!
          </h2>
        </ModalHeader>
        {selectedProduto ? (
          <ModalBody>
            <h5>
              Vil du slette dette produktet?{" "}
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
            Bekreft
          </NewButton>
          <ButtonClose
            type="button"
            onClick={() => setOpenDeleteProduto(!openDeleteProduto)}
          >
            Avbryt
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
};
