import { useEffect, useState } from "react";
import { Context, Grid } from "./styles";
import api from "../../../../../config/api";
import { Gear } from "phosphor-react";
import header from "../../../../../config/uri_header.json";
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
  sequencia?: string;
}

export const VideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<string[]>([]);
  const [videoInfo, setVideoInfo] = useState<VideoInfo[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sequencia, setSequencia] = useState("");
  const [videoSelecionado, setVideoSelecionado] = useState<VideoInfo | null>(
    null
  );
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);

  const toggleModal = (video?: any) => {
    if (modalOpen) {
      setModalOpen(false);
      return;
    }

    if (video) {
      console.log("Dados recebidos no modal:", video);
      setVideoSelecionado(video);
      setTitulo(video.titulo);
      setDescricao(video.descricao);
      setSequencia(video.sequencia?.toString() || "");
    }

    setModalOpen(true);
  };

  const toggleDeleteModal = (objID?: string) => {
    if (deleteModalOpen) {
      setDeleteModalOpen(false);
      setVideoToDelete(null);
      return;
    }

    if (objID) {
      setVideoToDelete(objID);
      setDeleteModalOpen(true);
    }
  };

  useEffect(() => {
    api
      .get("/AtekoAkademi/ListVideos")
      .then((response) => {
        setVideos(response.data.videos);
      })
      .catch((error) => console.error("Erro ao buscar vídeos:", error));
  }, []);

  useEffect(() => {
    api
      .get("/AtekoAkademi")
      .then((response) => {
        setVideoInfo(response.data);
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
      objID: info?.objID ?? "",
      titulo: info?.titulo ?? "Sem nome",
      descricao: info?.descricao ?? "Sem descrição",
      sequencia: info?.sequencia ?? "1",
    };
  });

  if (videos.length === 0) return <p>Carregando vídeos...</p>;

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
      }
    } catch (error) {
      console.error("Erro ao atualizar informações:", error);
    }
  };

  const handleDelete = async (objID: string) => {
    try {
      const response = await api.delete(`/AtekoAkademi?objId=${objID}`);
      if (response.data.isValid) {
        setVideos((prev) => prev.filter((video) => !video.includes(objID)));
        setVideoInfo((prev) => prev.filter((video) => video.objID !== objID));
      }
      return response.data.isValid ?? false;
    } catch (error) {
      console.error("Erro na requisição:", error);
      return false;
    }
  };

  const confirmDelete = async () => {
    if (videoToDelete) {
      await handleDelete(videoToDelete);
      toggleDeleteModal();
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
                          onClick={() => toggleDeleteModal(video.objID)}
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

      {/* Modal de Edição */}
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

      {/* Modal de Confirmação de Deleção */}
      <Modal isOpen={deleteModalOpen}>
        <CustomModalHeader toggle={toggleDeleteModal}>
          <h3 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            Confirmar Deleção
          </h3>
        </CustomModalHeader>
        <ModalBody>
          <p>Deseja realmente apagar este vídeo?</p>
        </ModalBody>
        <ModalFooter>
          <NewButton color="danger" onClick={confirmDelete}>
            Sim, Deletar
          </NewButton>
          <ButtonClose color="secondary" onClick={toggleDeleteModal}>
            Cancelar
          </ButtonClose>
        </ModalFooter>
      </Modal>
    </>
  );
};
