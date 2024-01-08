import { Dispatch, FC, SetStateAction } from "react";
import { IRecommendedSong } from "../../models";
import { Button } from "@mui/material";
import { addSong, getRecommendations } from "../../services/Track";

interface IRecommendationsProps {
  groupId: string;
  recommendations: IRecommendedSong[];
  setRecommendations: Dispatch<SetStateAction<IRecommendedSong[]>>;
}

const Recommendation: FC<IRecommendationsProps> = ({
  groupId,
  recommendations,
  setRecommendations,
}) => {
  const onAddSong = (songId: string) => {
    addSong({ group: groupId, trackInformation: songId }).then(() => {
      getRecommendations(groupId)
        .then((response: Array<IRecommendedSong>) => {
          setRecommendations(response);
        })
        .catch((error: unknown) => {
          console.log(error);
        });
    });
  };

  return (
    <div>
      {recommendations.map((song) => (
        <div key={song.id}>
          <p>{song.name}</p>
          <p>{song.author}</p>
          <p>{song.genre}</p>
          <Button onClick={() => onAddSong(song.id)}>Add Song</Button>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
