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
import Box from "@mui/material/Box";
import { IGroupBackend, IUser } from "../../models";
import GroupBackend from "../GroupBackend/GroupBackend";
import { getGroups } from "../../services/Group";
import "./GroupsBackend.scss";

const defaultTheme = createTheme();
const searchTheme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
});

interface IGroupsProps {
  setUser: Dispatch<SetStateAction<IUser>>;
  setGroup: Dispatch<SetStateAction<string>>;
}
const Groups: FC<IGroupsProps> = ({ setUser, setGroup}) => {
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
          setCurrentPage(response.currentPage);
          setTotalPages(response.totalPages);
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
      <ThemeProvider theme={searchTheme}>
        <Container component="main">
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <div className="group-search-div">
              <TextField
                sx={{ backgroundColor: "rgba(36, 102, 226, 0.6)" }}
                margin="normal"
                className="group-name"
                ref={searchNameInputRef}
                type="text"
                label="Group name"
                placeholder="Enter group name"
                onChange={handleSearchNameChange}
              />
              <Button className="search-group-btn" onClick={() => onSearch()}>
                Search
              </Button>
            </div>
          </Box>
        </Container>
      </ThemeProvider>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
          <Container sx={{ py: 6 }} maxWidth="md">
            <Grid container spacing={4}>
              {groups.map((group, key) => (
                <GroupBackend key={key} group={group} setUser={setUser} setGroup={setGroup}/>
              ))}
            </Grid>
          </Container>
        </ThemeProvider>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
        color="primary"
        size="large"
      />
    </div>
  );
};

export default Groups;
