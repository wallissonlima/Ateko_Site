import { Card } from "reactstrap";
import { Channel, Thumbnail, Title } from "./styles";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
}

interface Props {
  video: Video;
}

export const VideoCard: React.FC<Props> = ({ video }) => {
    if (!video || !video.id) return null;
  return (
    <>
    <Card to={`/watch/${video.id}`}>
      <Thumbnail src={video.thumbnail} alt={video.title} />
      <Title>{video.title}</Title>
      <Channel>{video.channel}</Channel>
    </Card>
    </>
  );
};
