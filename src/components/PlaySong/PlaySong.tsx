import { FC, useEffect, useRef, useState } from "react";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import { getCookie } from "typescript-cookie";
import "./PlaySong.scss";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
  groupId: string;
}

const PlaySong: FC<IPlaySongProps> = ({ groupId }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [song, setSong] = useState<{
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
  } | null>(null);

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
          const lyrics: {
            id: string;
            text: string;
            start: number;
            end: number;
          } | null = response.segments.length
            ? response.segments.filter(
                (segment: {
                  id: string;
                  text: string;
                  start: number;
                  end: number;
                }) =>
                  segment.start < JSON.parse(e.data).timeOffset / 1000 &&
                  segment.end > JSON.parse(e.data).timeOffset / 1000
              )[0]
            : null;
          console.log(lyrics);
          setLyrics(
            lyrics
              ? {
                  id: (
                    lyrics as {
                      id: string;
                      text: string;
                      start: number;
                      end: number;
                    }
                  ).id,
                  text: (
                    lyrics as {
                      id: string;
                      text: string;
                      start: number;
                      end: number;
                    }
                  ).text,
                  start: (
                    lyrics as {
                      id: string;
                      text: string;
                      start: number;
                      end: number;
                    }
                  ).start,
                  end: (
                    lyrics as {
                      id: string;
                      text: string;
                      start: number;
                      end: number;
                    }
                  ).end,
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
    // Handle the "ended" event to reset the songUrl or fetch the next song
    // This is where you can implement logic to play the next song if needed
    setSong({
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
