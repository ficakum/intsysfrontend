import { Dispatch, FC, SetStateAction, useState } from "react";
import { IRecommendedSong } from "../../models";
import { Button } from "@mui/material";
import { addSong, getRecommendations } from "../../services/Track";

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
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onAdd = (song: IRecommendedSong) => {
    addSong({ trackInformation: song._id, group: groupId }).catch(
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
    <div>
      {recommendations.map((song) => (
        <div key={song._id}>
          <p>{song.name}</p>
          <p>{song.author}</p>
          <p>{song.genre}</p>
          <Button
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsHovered(true)}
            onTouchEnd={() => setIsHovered(false)}
            onClick={() => onAdd(song)}
            style={{
              padding: "15px 32px 15px 32px",
              border: isHovered ? "" : "2px solid #4B4B4B",
              color: "#4B4B4B",
              boxShadow: isHovered
                ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
                : "",
            }}>
            Add Song
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Recommendation;
