import { FC } from "react";
import "./Lyrics.scss"

interface ILyricsProps {
  text: string;
}

const Lyrics: FC<ILyricsProps> = ({ text }) => {
  return (
    <div>
      <p className="lyrics">{text}</p>
    </div>
  );
};

export default Lyrics;
