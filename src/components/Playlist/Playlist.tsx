import { FC, useEffect, useState } from "react";
import { getCookie } from "typescript-cookie";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import Typography from "@mui/material/Typography";
import { Song } from "../../models";
import "./Playlist.scss"


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
    <div className="playlist-div">
      {
        (playlist.length > 0) && 
                          <Typography gutterBottom variant="h5" component="h2" className="playlist-title">
                            Next:
                          </Typography>
      }
      {playlist.map((song) => (
        <p key={song.id} className="playlist-song">{song.name} (Artist name)</p>
      ))}
    </div>
  );
};

export default Playlist;
