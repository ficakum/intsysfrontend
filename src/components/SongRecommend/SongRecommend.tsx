import { Button } from "@mui/material";
import { FC, useState } from "react";
import { IRecommendedSong } from "../../models";

interface ISongRecommendProps {
  song: IRecommendedSong;
  onAdd: (song: IRecommendedSong) => void;
}
const Song: FC<ISongRecommendProps> = ({ song, onAdd }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div>
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
          border: isHovered ? "" : "2px solid #ffffff",
          color: "#ffffff",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #000000, 0px -4px 15px 0px #ffffff"
            : "",
        }}>
        Add Song
      </Button>
    </div>
  );
};

export default Song;
