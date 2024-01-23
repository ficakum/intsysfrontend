import { Dispatch, FC, SetStateAction } from "react";
import { IRecommendedSong } from "../../models";
import SongRecommend from "../SongRecommend";
import { addSong, getRecommendations } from "../../services/Track";
import "./Recommendation.scss"

interface IRecommendationsProps {
  recommendations: IRecommendedSong[];
  setRecommendations: Dispatch<SetStateAction<IRecommendedSong[]>>;
  groupId: string;
}

const Recommendation: FC<IRecommendationsProps> = ({
  recommendations,
  setRecommendations,
  groupId,
}) => {
  const onAdd = (song: IRecommendedSong) => {
    addSong({ trackInformation: song._id.$oid, group: groupId }).catch(
      (error: unknown) => {
        console.log(error);
      }
    );

    getRecommendations(groupId)
      .then((response: Array<IRecommendedSong>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div className="songs">
      {recommendations.map((song) => (
        <SongRecommend key={song._id.$oid} song={song} onAdd={onAdd} />
      ))}
    </div>
  );
};

export default Recommendation;
