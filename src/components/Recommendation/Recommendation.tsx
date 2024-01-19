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
  const [isHovered, setIsHovered] = useState<boolean[]>([]);

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

  const setButtonHover = (index: number, hovered: boolean) => {
    const hover = isHovered;

    hover[index] = hovered;

    setIsHovered(hover);
  };

  return (
    <div>
      {recommendations.map((song, index) => (
        <div key={song._id}>
          <p>{song.name}</p>
          <p>{song.author}</p>
          <p>{song.genre}</p>
          <Button
            onMouseEnter={() => setButtonHover(index, true)}
            onMouseLeave={() => setButtonHover(index, false)}
            onTouchStart={() => setButtonHover(index, true)}
            onTouchEnd={() => setButtonHover(index, false)}
            onClick={() => onAdd(song)}
            style={{
              padding: "15px 32px 15px 32px",
              border: isHovered[index] ? "" : "2px solid #4B4B4B",
              color: "#4B4B4B",
              boxShadow: isHovered[index]
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
