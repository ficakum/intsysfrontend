import { FC } from "react";
import { IRecommendedSong } from "../../models";

interface IRecommendationsProps {
  recommendations: IRecommendedSong[];
}

const Recommendation: FC<IRecommendationsProps> = ({ recommendations }) => {
  return (
    <div>
      {recommendations.map((song) => (
        <div key={song.id}>
          <p>{song.name}</p>
          <p>{song.author}</p>
          <p>{song.genre}</p>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
