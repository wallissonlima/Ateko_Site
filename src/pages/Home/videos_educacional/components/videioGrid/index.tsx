import { useEffect, useState } from "react";
import { Context, Grid } from "./styles";
import api from "../../../../../config/api";
import { Gear } from "phosphor-react";
import header from "../../../../../config/uri_header.json";
import { toast } from "react-toastify";
import {
  Col,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { ButtonClose, CustomModalHeader, NewButton } from "../../styles";
import {
  CustomDropdownItem,
  CustomDropdownMenu,
} from "../../../../../components/Header/styles";

interface VideoInfo {
  objID: string;
  titulo: string;
  descricao: string;
  sequencia?: string; // Sequência pode ser opcional
}

export const VideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<string[]>([]); // Array de strings (nomes dos arquivos)
  const [videoInfo, setVideoInfo] = useState<VideoInfo[]>([]); // Dados completos dos vídeos
  const [modalOpen, setModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sequencia, setSequencia] = useState("");
  const [videoSelecionado, setVideoSelecionado] = useState<VideoInfo | null>(
    null
  );

  const toggleModal = (video?: any) => {
    if (modalOpen) {
      setModalOpen(false);
      return;
    }

    if (video) {
      console.log("Dados recebidos no modal:", video);
      setVideoSelecionado(video); // <- armazena o vídeo selecionado
      setTitulo(video.titulo);
      setDescricao(video.descricao);
      setSequencia(video.sequencia?.toString() || ""); // segurança contra undefined
    }

    setModalOpen(true);
  };

  useEffect(() => {
    api
      .get("/AtekoAkademi/ListVideos")
      .then((response) => {
        setVideos(response.data.videos); // Exemplo: ["id1.mp4", "id2.mp4"]
      })
      .catch((error) => console.error("Erro ao buscar vídeos:", error));
  }, []);

  useEffect(() => {
    api
      .get("/AtekoAkademi")
      .then((response) => {
        setVideoInfo(response.data); // Array de objetos { akademild, nome, descricao }
      })
      .catch((error) =>
        console.error("Erro ao buscar detalhes do vídeo:", error)
      );
  }, []);

  const cleanFileName = (titulo?: string) =>
    typeof titulo === "string" ? titulo.replace(".mp4", "") : "";

  const mergedVideos = videos.map((videoFileName) => {
    const cleanName = cleanFileName(videoFileName);
    const info = videoInfo.find((v) => cleanFileName(v.objID) === cleanName);
    return {
      akademild: videoFileName,
      objID: info?.objID ?? "", // <- importante!
      titulo: info?.titulo ?? "Sem nome",
      descricao: info?.descricao ?? "Sem descrição",
      sequencia: info?.sequencia ?? "1",
    };
  });

  if (videos.length === 0) return <p>Carregando vídeos...</p>;

  // Função para abrir o modal com os dados do vídeo selecionado
  const handleEdit = async () => {
    if (!videoSelecionado) return;

    const registro = {
      objID: videoSelecionado.objID,
      titulo,
      descricao,
      sequencia,
    };

    try {
      const result = await api.put(
        `/AtekoAkademi/UpdateVideoDesc?objID=${registro.objID}`,
        registro,
        { headers: header }
      );

      if (result?.status === 200) {
        setVideoInfo((prev) =>
          prev.map((video: any) =>
            video.objID === registro.objID ? { ...video, ...registro } : video
          )
        );

        setModalOpen(false);
      } else {
        toast.error("Erro ao atualizar informações.", { autoClose: 1500 });
      }
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
    }
  };

  // função para deletar o vídeo
  const handleDelete = async (objID: string) => {
    try {
      const response = await api.delete(`/AtekoAkademi?objId=${objID}`);

      return response.data.isValid ?? false;
    } catch (error) {
      console.error("Erro na requisição:", error, { autoClose: 1000 });
      // toast.error("Erro ao deletar fazenda.", { autoClose: 1000 });
      return false;
    }
  };

  return (
    <>
      <Context>
        <Grid>
          {mergedVideos.map((video, index) => {
            const videoId = video.akademild.replace(".mp4", "");
            const videoUrl = `https://atekoapi.kingssoftware.com.br/AtekoAkademi/GetVideoStreaming?AkademiId=${videoId}`;

            return (
              <div
                key={index}
                style={{ margin: "10px", width: "640px", marginTop: "-15px" }}
              >
                <video
                  width="100%"
                  height="360"
                  controls
                  style={{ borderRadius: "15px" }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Seu navegador não suporta o elemento de vídeo.
                </video>
                <Row style={{ marginTop: "8px" }}>
                  <Col lg="10">
                    <h3>{video.titulo}</h3>
                    <p>{video.descricao}</p>
                  </Col>
                  <Col
                    lg="2"
                    style={{ display: "flex", justifyContent: "flex-end" }}
                    className="selectIcon"
                  >
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
                        <CustomDropdownItem onClick={() => toggleModal(video)}>
                          Editar
                        </CustomDropdownItem>
                        <CustomDropdownItem divider />
                        <CustomDropdownItem
                          onClick={() => handleDelete(video.objID)}
                        >
                          Deleta
                        </CustomDropdownItem>
                      </CustomDropdownMenu>
                    </UncontrolledDropdown>
                  </Col>
                </Row>
              </div>
            );
          })}
        </Grid>
      </Context>

      {/* Modal de Formulário */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <CustomModalHeader toggle={toggleModal}>
          <h3 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            Editar informações do video
          </h3>
        </CustomModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="titulo">
                Título
              </Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="descricao">
                Descrição
              </Label>
              <Input
                id="descricao"
                type="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="sequencia">
                Sequência
              </Label>
              <Input
                id="sequencia"
                type="number"
                min={1}
                value={sequencia}
                onChange={(e) => setSequencia(e.target.value)}
                placeholder="Ex: 1"
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <NewButton color="primary" onClick={handleEdit}>
            Salvar
          </NewButton>
          <ButtonClose color="secondary" onClick={toggleModal}>
            Cancelar
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
};
