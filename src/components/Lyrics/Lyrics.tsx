import { FC } from "react";
import "./Lyrics.scss"

interface ILyricsProps {
  text: string;
}

const Lyrics: FC<ILyricsProps> = ({ text }) => {
  return (
      <p className="lyrics">{text}</p>
  );
};

export default Lyrics;
