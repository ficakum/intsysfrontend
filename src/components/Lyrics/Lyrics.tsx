import { FC } from "react";

interface ILyricsProps {
  text: string;
}

const Lyrics: FC<ILyricsProps> = ({ text }) => {
  return <p>{text}</p>;
};

export default Lyrics;
