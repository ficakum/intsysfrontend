import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AxiosError } from "axios";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IGroup, IUser } from "../../models";
import Group from "../Group/Group";
import { getGroupsRecommendation } from "../../services/Group";
import "./Groups.scss";

const defaultTheme = createTheme();

interface IGroupsProps {
  userId: string;
  setUser: Dispatch<SetStateAction<IUser>>;
}
const Groups: FC<IGroupsProps> = ({ userId, setUser }) => {
  const [groups, setGroups] = useState<Array<IGroup>>([]);

  useEffect(() => {
    getGroupsRecommendation(userId)
      .then((groupsPaginated) => {
        setGroups(groupsPaginated);

        return;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="recommended-groups-div">
      <Typography variant="h4" component="h2" className="title">
        Recommended groups
      </Typography>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
        <Container sx={{ py: 6 }} maxWidth="md">
          <Grid container spacing={4}>
            {groups.map((group, key) => (
              <Group key={key} group={group} setUser={setUser} />
            ))}
          </Grid>
        </Container>
    </ThemeProvider>
    </div>
  );
};

export default Groups;
