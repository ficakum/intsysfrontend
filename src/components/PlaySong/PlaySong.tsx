import { FC, useEffect, useState } from "react";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import { getCookie } from "typescript-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
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
  const [lyrics, setLyrics] = useState<{
    id: string;
    text: string;
    start: number;
    end: number;
  }>({ id: "", text: "", start: 0, end: 0 });

  useEffect(() => {
    const accessUserToken = getCookie(ACCESS_USER_TOKEN_KEY);

    const eventSource = new EventSource(
      `${apiUrl}v1/subscribe/groups/${groupId}/track?token=${accessUserToken}`
    );

    eventSource.addEventListener("CURRENT_TRACK", (e) => {
      setSong(JSON.parse(e.data));
      getLyrics("65a072fb6dff1f21c44e23c8" /* JSON.parse(e.data).externalId */)
        .then((respone: { segments: [] }) => {
          const lyrics = respone.segments
            ? respone.segments.filter(
                (segment: { start: number; end: number }) =>
                  segment.start < JSON.parse(e.data).timeOffset / 1000 &&
                  segment.end > JSON.parse(e.data).timeOffset / 1000
              )[0]
            : { id: "", text: "", start: 0, end: 0 };
          setLyrics({
            id: lyrics.id,
            text: lyrics.text,
            start: lyrics.start,
            end: lyrics.end,
          });
          console.log(lyrics);
        })
        .catch((error) => console.log(error));
    });

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
      </audio>
      <Lyrics text={lyrics && lyrics.text ? lyrics.text : "Text"} />
    </div>
  );
};

export default PlaySong;
