import { FC, useEffect, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";
import "./PlaySong.scss";
import { ILyrics, ISongEvent, initialSongEvent } from "../../models";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
  groupId: string;
}

const PlaySong: FC<IPlaySongProps> = ({ groupId }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [song, setSong] = useState<ISongEvent>(initialSongEvent);
  const [lyrics, setLyrics] = useState<ILyrics | null>(null);

  useEffect(() => {
    const accessUserToken = getCookie(ACCESS_USER_TOKEN_KEY);

    const eventSource = new EventSource(
      `${apiUrl}v1/subscribe/groups/${groupId}/track?token=${accessUserToken}`
    );

    eventSource.addEventListener("CURRENT_TRACK", (e) => {
      const eventData = JSON.parse(e.data);

      setSong({
        ...eventData,
        audio_link: (eventData.audio_link as string).replace("www.", "dl."),
        album_cover_link: (eventData.album_cover_link as string).replace(
          "www.",
          "dl."
        ),
      });

      if (audioRef.current) {
        audioRef.current.currentTime = eventData.timeOffset / 1000;
      }

      getLyrics(JSON.parse(e.data).infoId)
        .then((response: { segments: [] }) => {
          const lyrics: ILyrics | null = response.segments.length
            ? response.segments.filter(
                (segment: ILyrics) =>
                  segment.start < JSON.parse(e.data).timeOffset / 1000 &&
                  segment.end > JSON.parse(e.data).timeOffset / 1000
              )[0]
            : null;
          setLyrics(
            lyrics
              ? {
                  id: (lyrics as ILyrics).id,
                  text: (lyrics as ILyrics).text,
                  start: (lyrics as ILyrics).start,
                  end: (lyrics as ILyrics).end,
                }
              : null
          );
        })
        .catch((error) => console.log(error));
    });

    return () => {
      eventSource.close();
    };
  }, []);

  const handleAudioEnded = () => {
    setSong(initialSongEvent);
  };

  return (
    <div>
      {song.album_cover_link && (
        <img className="curr-song-img" src={song.album_cover_link} />
      )}
      {song.audio_link && (
        <audio
          key={song.audio_link}
          controls
          ref={audioRef}
          onEnded={handleAudioEnded}>
          <source src={song.audio_link} type="audio/mpeg" />
        </audio>
      )}
      {lyrics && lyrics.text && <Lyrics text={lyrics.text} />}
    </div>
  );
};

export default PlaySong;
