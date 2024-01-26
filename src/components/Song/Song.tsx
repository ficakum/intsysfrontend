import { FC } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { ISong } from "../../models";
import "./Song.scss"

interface ISongProps {
  song: ISong;
  onAdd: (song: ISong) => void;
}
const Song: FC<ISongProps> = ({ song, onAdd }) => {
  return (
    <Grid item xs={4}> 
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column", backgroundColor: "rgb(217, 93, 44, 0.4)"}}>
        <CardMedia
            component="div"
            sx={{
              // 16:9
              pt: "56.25%",
            }}
            image="https://dl.dropbox.com/scl/fi/nzfcowp3t3y2a5hu71il1/cover_img.jpg?rlkey=3tsa8iqzcr2pzmhctu1gg317i&dl=0"
        />
        <CardContent sx={{ flexGrow: 1, color: "white" }}>
          <Typography gutterBottom variant="h5" component="h2">
            {song.name}
          </Typography>
          <Typography>
            Artist: {song.author}
          </Typography>
          <Typography>
          Genre: {song.genre}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="large" onClick={() => onAdd(song)} className="add-back-song-btn">Add song</Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default Song;
