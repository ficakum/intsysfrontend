import { FC, useEffect, useState } from "react";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
  songLink: string;
  groupId: string;
}

const PlaySong: FC<IPlaySongProps> = ({ groupId }) => {
  const [song, setSong] = useState<{
    songurl: string;
    id: string;
    infoId: string;
    name: string;
    timeOffset: number;
    externalId: string;
    audio_link: string;
    vocals_link: string;
    instrumental_link: string;
    album_cover_link: string;
  }>({
    songurl: "",
    id: "",
    infoId: "",
    name: "",
    timeOffset: 0,
    externalId: "",
    audio_link: "",
    vocals_link: "",
    instrumental_link: "",
    album_cover_link: "",
  });
  const [lyrics, setLyrics] = useState<string>("");

  useEffect(() => {
    const eventSource = new EventSource(
      `${apiUrl}v1/subscribe/groups/${groupId}/track`
    );

    eventSource.onmessage = (e) => {
      setSong(e.data);
      getLyrics(e.data.externalId).then((respone) => setLyrics(respone));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      <audio controls>
        <source
          src={song.songurl} // "https://dl.dropbox.com/scl/fi/7sq3pi7dcs8q1sr0z7lk1/Mabel-Don-t-Call-Me-Up.mp3?rlkey=kt4cn9ii34ufutu7rbccnwuqj&dl=0"
          type="audio/mpeg"
        />
        <Lyrics text={lyrics} />
      </audio>
    </div>
  );
};

export default PlaySong;
