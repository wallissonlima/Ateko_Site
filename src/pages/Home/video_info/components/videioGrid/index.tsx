import { useEffect, useState } from "react";
import { Context, Grid } from "./styles";
import api from "../../../../../config/api";

interface VideoInfo {
  objID: string;
  titulo: string;
  descricao: string;
}

export const VideoGrid: React.FC = () => {
  const [videos, setVideos] = useState<string[]>([]); // Array de strings (nomes dos arquivos)
  const [videoInfo, setVideoInfo] = useState<VideoInfo[]>([]); // Dados completos dos vídeos

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
      titulo: info?.titulo ?? "Sem nome",
      descricao: info?.descricao ?? "Sem descrição",
    };
  });

  if (videos.length === 0) return <p>Carregando vídeos...</p>;

  return (
    <Context>
      <Grid>
        {mergedVideos.map(({ akademild, titulo, descricao }, index) => {
          const videoId = akademild.replace(".mp4", "");
          const videoUrl = `https://atekoapi.kingssoftware.com.br/AtekoAkademi/GetVideoStreaming?AkademiId=${videoId}`;

          return (
            <div key={index} style={{ margin: "16px", width: "640px" }}>
              <video
                width="100%"
                height="360"
                controls
                style={{ borderRadius: "15px" }}
              >
                <source src={videoUrl} type="video/mp4" />
                Seu navegador não suporta o elemento de vídeo.
              </video>
              <h3>{titulo}</h3>
              <p>{descricao}</p>
            </div>
          );
        })}
      </Grid>
    </Context>
  );
};
