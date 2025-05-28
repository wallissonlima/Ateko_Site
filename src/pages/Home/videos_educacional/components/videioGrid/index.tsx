import { VideoCard } from "../videoCard";
import { Context, Grid } from "./styles";

interface Video {
  id: string;
  thumbnail: string;
  title: string;
  channel: string;
}

interface Props {
  videos: Video[];
}

export const VideoGrid: React.FC<Props> = ({ videos }) => {
  return (
    <Context>
      <Grid>
        {videos
          .filter((video) => video && video.id)
          .map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
      </Grid>
    </Context>
  );
};
