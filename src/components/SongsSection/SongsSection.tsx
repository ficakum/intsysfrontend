import { FC, useState } from "react";
import Playlist from "../Playlist";
import { Song } from "../../models";
import Recommendation from "../Recommendation";
import { getRecommendations } from "../../services/Track";
import { Button } from "@mui/material";
import AddSong from "../AddSong";

interface ISongsSectionProps {
  groupId: string;
}

const SongsSection: FC<ISongsSectionProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<Song[]>([]);

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
      <Playlist groupId={groupId} />
      <Recommendation recommendations={recommendations} />
      <AddSong />
      <Button onClick={onAddSong}>Add Song</Button>
    </div>
  );
};

export default SongsSection;
