import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { AxiosError } from "axios";
// import Typography from "@mui/material/Typography";
// import CssBaseline from "@mui/material/CssBaseline";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IGroupBackend, IUser } from "../../models";
import GroupBackend from "../GroupBackend/GroupBackend";
import { getGroups } from "../../services/Group";
import "./GroupsBackend.scss";
import { Button, Pagination, TextField } from "@mui/material";

// const defaultTheme = createTheme();

interface IGroupsProps {
  setUser: Dispatch<SetStateAction<IUser>>;
}
const Groups: FC<IGroupsProps> = ({ setUser }) => {
  const searchNameInputRef = useRef<HTMLInputElement | null>(null);
  const [groups, setGroups] = useState<Array<IGroupBackend>>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [searchName, setSearchName] = useState<string>("");

  useEffect(() => {
    getGroups(1, 9)
      .then(
        (response: {
          items: IGroupBackend[];
          currentPage: number;
          totalPages: number;
        }) => {
          setGroups(response.items);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);

          return;
        }
      )
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  const handlePageChange = (_event: ChangeEvent<unknown>, value: number) => {
    getGroups(value, 10)
      .then(
        (response: {
          items: IGroupBackend[];
          currentPage: number;
          totalPages: number;
        }) => {
          setGroups(response.items);
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
        }
      )
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  const handleSearchNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSearchName = event.target.value;
    setSearchName(newSearchName);
  };

  const onSearch = () => {
    getGroups(1, 10, searchName)
      .then(
        (response: {
          items: IGroupBackend[];
          currentPage: number;
          totalPages: number;
        }) => {
          setGroups(response.items);
        }
      )
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div className="groups-div">
      <div className="search-div">
        <TextField
          className="song-name"
          ref={searchNameInputRef}
          type="text"
          placeholder="Enter song name"
          onChange={handleSearchNameChange}
        />
        <Button className="search-song-btn" onClick={() => onSearch()}>
          Search
        </Button>
      </div>
      {groups.map((group, key) => (
        <GroupBackend key={key} group={group} setUser={setUser} />
      ))}
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

export default Groups;
