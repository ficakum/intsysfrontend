import { FC, useEffect, useState } from "react";
import { Song } from "../../models";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import { getCookie } from "typescript-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaylistProps {
  groupId: string;
}

const Playlist: FC<IPlaylistProps> = ({ groupId }) => {
  const [playlist, setPlaylist] = useState<Array<Song>>([]);

  useEffect(() => {
    const accessUserToken = getCookie(ACCESS_USER_TOKEN_KEY);

    const eventSource = new EventSource(
      `${apiUrl}v1/subscribe/groups/${groupId}/playlist?token=${accessUserToken}`
    );
    eventSource.addEventListener("PLAYLIST", (e) => {
      setPlaylist(JSON.parse(e.data).playlist);
    });
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {playlist.map((song) => (
        <p key={song.id}>{song.name}</p>
      ))}
    </div>
  );
};

export default Playlist;
