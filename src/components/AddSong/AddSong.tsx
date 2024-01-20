import { Button, Pagination, TextField } from "@mui/material";
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
import Song from "../Song";

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
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

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
      .then(
        (response: {
          items: IRecommendedSong[];
          currentPage: number;
          totalPages: number;
        }) => {
          setSongs(response.items);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
        }
      )
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    getTrackInfos(value, 10)
      .then(
        (response: {
          items: IRecommendedSong[];
          currentPage: number;
          totalPages: number;
        }) => {
          setSongs(response.items);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
        }
      )
      .catch((error: unknown) => {
        console.log(error);
      });
  };

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
    addSong({ trackInformation: song._id.$oid, group: groupId }).catch(
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
        placeholder="Enter song name"
        onChange={handleSearchNameChange}
      />
      <TextField
        className="signin-username"
        ref={searchAuthorInputRef}
        type="text"
        placeholder="Enter author"
        onChange={handleSearchAuthorChange}
      />
      <Button onClick={() => onSearch()}>Search</Button>
      {songs.map((song) => (
        <Song key={song._id.$oid} song={song} onAdd={onAdd} />
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default AddSong;
