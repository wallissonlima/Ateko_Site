import {
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Progress,
} from "reactstrap";
import { Context, NewButton } from "./styles";
import { Header } from "../../../components/Header";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setVideos([
      {
        id: "1",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresentação",
        channel: "Canal A",
      },
      {
        id: "2",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresentação 2",
        channel: "Canal B",
      },
      {
        id: "3",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresentação 3",
        channel: "Canal C",
      },
    ]);
  }, []);

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
          idVideo: objID, // Use objID from metadata response
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
        id: objID, // Use objID as the video ID
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: titulo,
        channel: descricao,
        videoUrl: `/videos/${objID}`, // Use objID in the video URL
      };

      setVideos([...videos, novoVideo]);

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
          <Col lg="6">
            <NewButton onClick={toggleModal}>Novo Vídeo</NewButton>
          </Col>
          <VideoGrid videos={videos} />
        </Row>
      </Context>

      {/* Modal de Formulário */}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Adicionar Novo Vídeo</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="titulo">Título</Label>
              <Input
                id="titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="Digite o título"
              />
            </FormGroup>
            <FormGroup>
              <Label for="descricao">Descrição</Label>
              <Input
                id="descricao"
                type="textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                placeholder="Digite a descrição"
              />
            </FormGroup>
            <FormGroup>
              <Label for="sequencia">Sequência</Label>
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
              <Label for="video">Selecionar Vídeo</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleFileChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>
            Salvar
          </Button>
          <Button color="secondary" onClick={toggleModal}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      {/* Modal de Progresso */}
      <Modal isOpen={progressModalOpen} backdrop="static" keyboard={false}>
        <ModalHeader>Enviando Vídeo</ModalHeader>
        <ModalBody>
          <p>Por favor, aguarde enquanto o vídeo é enviado...</p>
          <Progress animated value={uploadProgress} max={100}>
            {Math.round(uploadProgress)}%
          </Progress>
        </ModalBody>
      </Modal>
    </>
  );
};
