import { Col, Row } from "reactstrap";
import { Context, NewButton } from "./styles";
import { Header } from "../../../components/Header";

import { useEffect, useState } from "react";
import { VideoGrid } from "./components/videioGrid";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
}

export const VideosEducacional: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  useEffect(() => {
    setVideos([
      {
        id: "1",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação",
        channel: "Canal A",
      },
      {
        id: "2",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação 2",
        channel: "Canal B",
      },
      {
        id: "3",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação 3",
        channel: "Canal c",
      },
      {
        id: "4",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação 4",
        channel: "Canal d",
      },
      {
        id: "5",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação 5",
        channel: "Canal d",
      },
      {
        id: "6",
        thumbnail: "https://img.youtube.com/vi/exMe3ZRamoU/hqdefault.jpg",
        title: "Apresetação 6",
        channel: "Canal d",
      },
    ]);
  }, []);

  return (
    <>
      <Header />
      <Context>
        <Row>
          <Col lg="6">
            <NewButton>Nova Video</NewButton>
          </Col>
          <VideoGrid videos={videos} />
        </Row>
      </Context>
    </>
  );
};
