import { Button, TextField } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { IRecommendedSong } from "../../models";
import {
  addSong,
  getRecommendations,
  getTrackInfos,
} from "../../services/Track";

interface IAddSongProps {
  groupId: string;
  setRecommendations: Dispatch<SetStateAction<IRecommendedSong[]>>;
}

const AddSong: FC<IAddSongProps> = ({ groupId, setRecommendations }) => {
  const searchNameInputRef = useRef<HTMLInputElement | null>(null);
  const searchAuthorInputRef = useRef<HTMLInputElement | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchAuthor, setSearchAuthor] = useState<string>("");
  const [songs, setSongs] = useState<IRecommendedSong[]>([]);
  const [isHoveredAdd, setIsHoveredAdd] = useState<boolean>(false);

  const handleSearchNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchName = event.target.value;
    setSearchName(newSearchName);
  };

  const handleSearchAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchAuthor = event.target.value;
    setSearchAuthor(newSearchAuthor);
  };

  useEffect(() => {
    getTrackInfos(1, 10)
      .then((response: IRecommendedSong[]) => {
        setSongs(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  const onSearch = () => {
    getTrackInfos(1, 10, searchName, searchAuthor)
      .then((response: IRecommendedSong[]) => {
        setSongs(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const onAdd = (song: IRecommendedSong) => {
    addSong({ trackInformation: song._id, group: groupId }).catch(
      (error: unknown) => {
        console.log(error);
      }
    );

    getRecommendations(groupId)
      .then((response: Array<IRecommendedSong>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div>
      <TextField
        className="signin-username"
        ref={searchNameInputRef}
        type="text"
        placeholder="Enter username"
        onChange={handleSearchNameChange}
      />
      <TextField
        className="signin-username"
        ref={searchAuthorInputRef}
        type="text"
        placeholder="Enter username"
        onChange={handleSearchAuthorChange}
      />
      <Button onClick={() => onSearch()}>Search</Button>
      {songs.map((song) => (
        <div key={song._id}>
          <p>{song.name}</p>
          <p>{song.author}</p>
          <p>{song.genre}</p>
          <Button
            onMouseEnter={() => setIsHoveredAdd(true)}
            onMouseLeave={() => setIsHoveredAdd(false)}
            onTouchStart={() => setIsHoveredAdd(true)}
            onTouchEnd={() => setIsHoveredAdd(false)}
            onClick={() => onAdd(song)}
            style={{
              padding: "15px 32px 15px 32px",
              border: isHoveredAdd ? "" : "2px solid #4B4B4B",
              color: "#4B4B4B",
              boxShadow: isHoveredAdd
                ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
                : "",
            }}>
            Add Song
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AddSong;
