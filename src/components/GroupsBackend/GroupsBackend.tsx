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
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Button, Pagination, TextField } from "@mui/material";
import { IGroupBackend, IUser } from "../../models";
import GroupBackend from "../GroupBackend/GroupBackend";
import { getGroups } from "../../services/Group";
import "./GroupsBackend.scss";

const defaultTheme = createTheme();

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
    getGroups(value, 9)
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
    getGroups(1, 9, searchName)
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
    <div className="all-groups-div">
      <Typography variant="h4" component="h2" className="title">
          All groups
      </Typography>
      <div className="group-search-div">
        <TextField
          className="group-name"
          ref={searchNameInputRef}
          type="text"
          placeholder="Enter group name"
          onChange={handleSearchNameChange}
        />
        <Button className="search-group-btn" onClick={() => onSearch()}>
          Search
        </Button>
      </div>
      <div className="all-groups-div">
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
          <Container sx={{ py: 6 }} maxWidth="md">
            <Grid container spacing={4}>
              {groups.map((group, key) => (
                <GroupBackend key={key} group={group} setUser={setUser} />
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

export default Groups;
