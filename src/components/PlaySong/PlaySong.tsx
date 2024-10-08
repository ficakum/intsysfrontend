import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { getCookie } from "typescript-cookie";
import { ACCESS_USER_TOKEN_KEY } from "../../constants/auth";
import { ILyrics, ISongEvent, initialSongEvent } from "../../models";
import Lyrics from "../Lyrics";
import { getLyrics } from "../../services/Track";
import "./PlaySong.scss";

const apiUrl = process.env.REACT_APP_API_URL;

interface IPlaySongProps {
  groupId: string;
}

const PlaySong: FC<IPlaySongProps> = ({ groupId }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [song, setSong] = useState<ISongEvent>(initialSongEvent);
  const [lyrics, setLyrics] = useState<ILyrics | null>(null);
  // const [isPlaying, setIsPlaying] = useState(false);

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
        instrumental_link: (eventData.instrumental_link as string).replace(
          "www.",
          "dl."
        ),
        album_cover_link: (eventData.album_cover_link as string).replace(
          "www.",
          "dl."
        ),
      });

      if (audioRef.current) {
        audioRef.current.currentTime = eventData.timeOffset / 1000;
      }

      if (eventData.instrumental_link) {
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
      } else {
        setLyrics(null);
      }
    });

    return () => {
      eventSource.close();
    };
  }, []);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     if (isPlaying) {
  //       audioRef.current.play();
  //     } else {
  //       audioRef.current.pause();
  //     }
  //   }
  // }, [isPlaying]);

  // const togglePlay = () => {
  //   setIsPlaying(!isPlaying);
  // };

  const handleAudioEnded = () => {
    setSong(initialSongEvent);
  };

  const [isCheckedKaraoke, setIsCheckedKaraoke] = useState(false);
  const [isCheckedLyrics, setIsCheckedLyrics] = useState(false);

  const handleKaraokeCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setIsCheckedKaraoke(event.target.checked);
  };

  const handleLyricsCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsCheckedLyrics(event.target.checked);
  };

  return song.id ? (
    <div className="curr-song-div">
      {song.album_cover_link && (
        <label className="cb-label">Playing: {song.name}</label>
      )}
      {song.album_cover_link && (
        <img className="curr-song-img" src={song.album_cover_link} />
      )}
      {!isCheckedKaraoke && song.audio_link && (
        <div>
          <audio
            key={song.audio_link}
            controlsList="nodownload noplaybackrate"
            controls
            autoPlay
            ref={audioRef}
            onEnded={handleAudioEnded}>
            <source src={song.audio_link} type="audio/mpeg" />
          </audio>
        </div>
      )}
      {isCheckedKaraoke && song.instrumental_link && (
        <div>
          <audio
            key={song.instrumental_link}
            controlsList="nodownload noplaybackrate"
            autoPlay
            controls
            ref={audioRef}
            onEnded={handleAudioEnded}>
            <source src={song.instrumental_link} type="audio/mpeg" />
          </audio>
        </div>
      )}
      <div className="check-btns">
        {song.instrumental_link && (
          <label className="cb-label">
            <input
              type="checkbox"
              checked={isCheckedKaraoke}
              onChange={handleKaraokeCheckboxChange}
            />
            Play karaoke?
          </label>
        )}
        {song.instrumental_link && (
          <label className="cb-label">
            <input
              type="checkbox"
              checked={isCheckedLyrics}
              onChange={handleLyricsCheckboxChange}
            />
            See lyrics?
          </label>
        )}
      </div>
      {isCheckedLyrics && (
        <div className="lyrics-div">
          {lyrics && lyrics.text && <Lyrics text={lyrics.text} />}
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
};

export default PlaySong;
