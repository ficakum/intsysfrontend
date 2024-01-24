import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, Pagination, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IRecommendedSong, ISong } from "../../models";
import Song from "../Song";
import {
  addSong,
  getRecommendations,
  getTrackInfos,
} from "../../services/Track";
import { predictGroupCluster } from "../../services/Group";
import "./AddSong.scss";

const defaultTheme = createTheme();

interface IAddSongProps {
  groupId: string;
  setRecommendations: Dispatch<SetStateAction<IRecommendedSong[]>>;
}

const AddSong: FC<IAddSongProps> = ({ groupId, setRecommendations }) => {
  const searchNameInputRef = useRef<HTMLInputElement | null>(null);
  const searchAuthorInputRef = useRef<HTMLInputElement | null>(null);
  const [searchName, setSearchName] = useState<string>("");
  const [searchAuthor, setSearchAuthor] = useState<string>("");
  const [songs, setSongs] = useState<ISong[]>([]);
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
    getTrackInfos(1, 9)
      .then(
        (response: {
          items: ISong[];
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
    getTrackInfos(value, 9)
      .then(
        (response: {
          items: ISong[];
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
    getTrackInfos(1, 9, searchName, searchAuthor)
      .then((response: ISong[]) => {
        setSongs(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const onAdd = (song: ISong) => {
    addSong({ trackInformation: song._id, group: groupId })
      .then(() => {
        predictGroupCluster(groupId);
      })
      .catch((error: unknown) => {
        console.log(error);
      });

    getRecommendations(groupId)
      .then((response: Array<IRecommendedSong>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div className="all-songs-div">
      <Typography variant="h4" component="h2" className="title">
          All songs
      </Typography>
      <div className="song-search-div">
        <TextField
          className="song-name"
          ref={searchNameInputRef}
          type="text"
          placeholder="Enter song name"
          onChange={handleSearchNameChange}
        />
        <TextField
          className="song-author"
          ref={searchAuthorInputRef}
          type="text"
          placeholder="Enter author"
          onChange={handleSearchAuthorChange}
        />
        <Button className="search-song-btn" onClick={() => onSearch()}>
          Search
        </Button>
      </div>
      <div className="all-songs-div">
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
          <Container sx={{ py: 6 }} maxWidth="md">
            <Grid container spacing={4}>
              {songs.map((song) => (
                <Song key={song._id} song={song} onAdd={onAdd} />
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      </div>
      <Pagination
        className="pagination"
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
