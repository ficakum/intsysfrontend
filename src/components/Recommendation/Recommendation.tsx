import { Dispatch, FC, SetStateAction } from "react";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IRecommendedSong } from "../../models";
import SongRecommend from "../SongRecommend";
import { addSong, getRecommendations } from "../../services/Track";
import { predictGroupCluster } from "../../services/Group";
import "./Recommendation.scss";

const defaultTheme = createTheme();

interface IRecommendationsProps {
  recommendations: IRecommendedSong[];
  setRecommendations: Dispatch<SetStateAction<IRecommendedSong[]>>;
  groupId: string;
}

const Recommendation: FC<IRecommendationsProps> = ({
  recommendations,
  setRecommendations,
  groupId,
}) => {
  const onAdd = (song: IRecommendedSong) => {
    addSong({ trackInformation: song._id.$oid, group: groupId })
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
    <div className="songs-div">
      <Typography variant="h4" component="h2" className="title">
        Recommended songs
      </Typography>
      <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
        <Container sx={{ py: 6 }} maxWidth="md">
          <Grid container spacing={4}>
            {recommendations.map((song) => (
              <SongRecommend key={song._id.$oid} song={song} onAdd={onAdd} />
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

export default Recommendation;
