import { FC, useEffect, useRef, useState } from "react";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import { getCookie } from "typescript-cookie";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
  groupId: string;
}

const PlaySong: FC<IPlaySongProps> = ({ groupId }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
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
      const eventData = JSON.parse(e.data);
      console.log((eventData.audio_link as string).replace("www", "dl"));

      setSong({
        ...eventData,
        audio_link: (eventData.audio_link as string).replace("www.", "dl."),
      });

      if (audioRef.current) {
        audioRef.current.currentTime = eventData.timeOffset / 1000;
      }

      getLyrics(JSON.parse(e.data).externalId)
        .then((respone: { segments: [] }) => {
          const lyrics: {
            id: string;
            text: string;
            start: number;
            end: number;
          } = respone.segments.length
            ? respone.segments.filter(
                (segment: {
                  id: string;
                  text: string;
                  start: number;
                  end: number;
                }) =>
                  segment.start < JSON.parse(e.data).timeOffset / 1000 &&
                  segment.end > JSON.parse(e.data).timeOffset / 1000
              )[0]
            : { id: "", text: "Text", start: 0, end: 0 };
          setLyrics({
            id: lyrics.id,
            text: lyrics.text,
            start: lyrics.start,
            end: lyrics.end,
          });
        })
        .catch((error) => console.log(error));
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {song.audio_link && (
        <audio controls ref={audioRef}>
          <source src={song.audio_link} type="audio/mpeg" />
        </audio>
      )}
      <Lyrics text={lyrics && lyrics.text ? lyrics.text : "Text"} />
    </div>
  );
};

export default PlaySong;
