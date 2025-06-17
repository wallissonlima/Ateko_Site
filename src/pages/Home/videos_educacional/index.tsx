import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
} from "reactstrap";
import { ButtonClose, Context, CustomModalHeader, NewButton } from "./styles";
import { Header } from "../../../components/Header";
import { useState } from "react";
import { VideoGrid } from "./components/videioGrid";
import { v4 as uuidv4 } from "uuid";
import api from "../../../config/api";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
  videoUrl?: string;
}

export const VideosEducacional: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [progressModalOpen, setProgressModalOpen] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [sequencia, setSequencia] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [gridKey, setGridKey] = useState(0); // State to force VideoGrid remount

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    if (modalOpen) {
      setTitulo("");
      setDescricao("");
      setSequencia("");
      setVideoFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
    } else {
      alert("Por favor, selecione um arquivo de vídeo válido.");
      setVideoFile(null);
    }
  };

  const chunkFile = (file: File, chunkSize: number): Blob[] => {
    const chunks: Blob[] = [];
    let start = 0;
    while (start < file.size) {
      const end = Math.min(start + chunkSize, file.size);
      chunks.push(file.slice(start, end));
      start = end;
    }
    return chunks;
  };

  const handleSubmit = async () => {
    if (!titulo || !descricao || !sequencia || !videoFile) {
      alert("Preencha todos os campos e selecione um vídeo!");
      return;
    }

    if (!/^\d+$/.test(sequencia)) {
      alert("Sequência deve ser um número inteiro.");
      return;
    }

    try {
      const up_file = {
        titulo: titulo,
        descricao: descricao,
        sequence: parseInt(sequencia),
      };

      // Save video metadata and get objID
      const up_date_for_video = await api.post(`/AtekoAkademi`, up_file, {
        headers: { "Content-Type": "application/json" },
      });

      console.log(up_date_for_video);

      if (!up_date_for_video.data.isValid) {
        throw new Error("Erro ao salvar os metadados do vídeo.");
      }

      const objID = up_date_for_video.data.video_desc.objID;

      // Divide o vídeo em partes de 1MB
      const chunkSize = 1 * 1024 * 1024; // 1MB
      const chunks = chunkFile(videoFile, chunkSize);

      // Abre a modal de progresso
      setProgressModalOpen(true);
      setUploadProgress(0);

      // Envia cada parte
      for (let i = 0; i < chunks.length; i++) {
        const chunk = chunks[i];
        const reader = new FileReader();

        // Converte o chunk para Base64
        const base64Promise = new Promise<string>((resolve) => {
          reader.onload = () => {
            const base64String = (reader.result as string).split(",")[1];
            resolve(base64String);
          };
          reader.readAsDataURL(chunk);
        });

        const videoPartition = await base64Promise;

        // Corpo da requisição
        const body = {
          idPartition: uuidv4(),
          idVideo: objID,
          partition: i + 1,
          videoPartition: videoPartition,
        };

        const response = await api.post(
          `/AtekoAkademi/LeggTilMidlertidig`,
          body,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        console.log(response);

        if (!response.data.isValid) {
          throw new Error(`Erro ao enviar a parte ${i + 1}`);
        }

        // Atualiza o progresso
        setUploadProgress(((i + 1) / chunks.length) * 100);
      }

      const up_video_to_server = await api.post(
        `/AtekoAkademi/LagreDiagnostikkvideo?IdAkademiVideo=${objID}`
      );

      console.log(up_video_to_server);

      // Após enviar todas as partes, adiciona o vídeo à lista
      const novoVideo: Video = {
        id: objID,
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: titulo,
        channel: descricao,
        videoUrl: `/videos/${objID}`,
      };

      setVideos([...videos, novoVideo]);

      // Force VideoGrid to remount and refetch data
      setGridKey((prev) => prev + 1);

      // Limpa campos e fecha modais
      setTitulo("");
      setDescricao("");
      setSequencia("");
      setVideoFile(null);
      setProgressModalOpen(false);
      toggleModal();
    } catch (error) {
      console.error("Erro no upload:", error);
      alert("Ocorreu um erro ao enviar o vídeo. Tente novamente.");
      setProgressModalOpen(false);
    }
  };

  return (
    <>
      <Header />
      <Context>
        <Row>
          <Col lg="6" style={{ padding: "0px 0px 0px 40px" }}>
            <NewButton onClick={toggleModal}>Ny video</NewButton>
          </Col>
          <div key={gridKey}>
            <VideoGrid />
          </div>
        </Row>
      </Context>

      {/* Modal de Formulário */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <CustomModalHeader toggle={toggleModal}>
          <h2 style={{ fontWeight: "bold", fontFamily: "Arial, sans-serif" }}>
            Legg til ny video
          </h2>
        </CustomModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="titulo">
                Tittel
              </Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Skriv inn tittelen"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="descricao">
                Beskrivelse
              </Label>
              <Input
                id="descricao"
                type="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Skriv inn beskrivelsen"
              />
            </FormGroup>
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="sequencia">
                Sekvens
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
            <FormGroup>
              <Label style={{ fontWeight: "bold" }} for="video">
                Velg video
              </Label>
              <Input
                id="video"
                type="file"
                accept="video/mp4"
                onChange={handleFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <NewButton color="primary" onClick={handleSubmit}>
            Berging
          </NewButton>
          <ButtonClose color="secondary" onClick={toggleModal}>
            Kansellere
          </ButtonClose>
        </ModalFooter>
      </Modal>

      {/* Modal de Progresso */}
      <Modal isOpen={progressModalOpen} backdrop="static" keyboard={false}>
        <ModalHeader>Sender video</ModalHeader>
        <ModalBody>
          <p>Vent mens videoen lastes opp...</p>
          <Progress animated value={uploadProgress} max={100}>
            {Math.round(uploadProgress)}%
          </Progress>
        </ModalBody>
      </Modal>
    </>
  );
};
