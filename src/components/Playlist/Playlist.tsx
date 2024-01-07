import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Song } from "../../models";
import SongList from "../SongList";
import { getRecommendations } from "../../services/Track";
import { Button } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaylistProps {
  groupId: string;
  setRecommendations: Dispatch<SetStateAction<Song[]>>;
}

const Playlist: FC<IPlaylistProps> = ({ groupId, setRecommendations }) => {
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

  const onAddSong = () => {
    getRecommendations(groupId)
      .then((response: Array<Song>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SongList songList={playlist} />
      <Button onClick={onAddSong}>Add Song</Button>
    </div>
  );
};

export default Playlist;
