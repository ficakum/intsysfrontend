import { FC, useState } from "react";
import { Song } from "../../models";
import { getRecommendations } from "../../services/Track";
import { Button } from "@mui/material";
import SongList from "../SongList";

interface IRecommendationsProps {
  groupId: string;
}

const Recommendation: FC<IRecommendationsProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<Array<Song>>([]);

  const onAddSong = () => {
    getRecommendations(groupId)
      .then((response: Array<Song>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SongList songList={recommendations} />
      <Button onClick={onAddSong} />
    </div>
  );
};

export default Recommendation;
