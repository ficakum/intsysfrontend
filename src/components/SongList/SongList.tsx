import { FC } from "react";
import { Song } from "../../models";

interface ISongListProps {
  songList: Array<Song>;
}

const SongList: FC<ISongListProps> = ({ songList }) => {
  return (
    <div>
      {songList.map((song) => (
        <p key={song.name}>{song.name}</p>
      ))}
    </div>
  );
};

export default SongList;
