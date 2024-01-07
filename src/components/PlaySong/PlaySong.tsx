import { FC } from "react";

interface IPlaySongProps {
  songLink: string;
}

const PlaySong: FC<IPlaySongProps> = ({ songLink }) => {
  return (
    <div>
      <audio controls>
        <source
          src={songLink} // "https://dl.dropbox.com/scl/fi/7sq3pi7dcs8q1sr0z7lk1/Mabel-Don-t-Call-Me-Up.mp3?rlkey=kt4cn9ii34ufutu7rbccnwuqj&dl=0"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
};

export default PlaySong;
