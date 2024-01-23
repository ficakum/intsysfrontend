import { FC, useState } from "react";
import { Button } from "@mui/material";
import { ISong } from "../../models";
import "./Song.scss"

interface ISongProps {
  song: ISong;
  onAdd: (song: ISong) => void;
}
const Song: FC<ISongProps> = ({ song, onAdd }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div className="song">
      <div className="song-info-img">
        <div className="song-paragr">
          <p className="song-info">Name: {song.name}</p>
          <p className="song-info">Author: {song.author}</p>
          <p className="song-info">Genre: {song.genre}</p>
        </div>
        {/* <img className="song-info-img" src="https://dl.dropbox.com/scl/fi/nzfcowp3t3y2a5hu71il1/cover_img.jpg?rlkey=3tsa8iqzcr2pzmhctu1gg317i&dl=0" /> */}
      </div>
      <Button className="add-song-btn"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onAdd(song)}>
        {/* style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #ffffff",
          color: "#ffffff",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #000000, 0px -4px 15px 0px #ffffff"
            : "",
        }} */}
        Add Song
      </Button>
    </div>
  );
};

export default Song;
