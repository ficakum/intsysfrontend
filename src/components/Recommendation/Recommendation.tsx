import { FC } from "react";
import { Song } from "../../models";
import SongList from "../SongList";

interface IRecommendationsProps {
  recommendations: Song[];
}

const Recommendation: FC<IRecommendationsProps> = ({ recommendations }) => {
  return (
    <div>
      <SongList songList={recommendations} />
    </div>
  );
};

export default Recommendation;
