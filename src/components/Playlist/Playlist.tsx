import { FC, useEffect, useState } from "react";
import { Song } from "../../models";
import SongList from "../SongList";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaylistProps {
  groupId: string;
}

const Playlist: FC<IPlaylistProps> = ({ groupId }) => {
  const [playlist, setPlaylist] = useState<Array<Song>>([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${apiUrl}v1/subscribe/groups/${groupId}/playlist`
    );
    eventSource.onmessage = (e) => setPlaylist(e.data.playlist);
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <SongList songList={playlist} />
    </div>
  );
};

export default Playlist;
