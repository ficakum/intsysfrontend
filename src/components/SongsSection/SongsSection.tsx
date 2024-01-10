import { FC, useState } from "react";
import Playlist from "../Playlist";
import { IRecommendedSong } from "../../models";
import Recommendation from "../Recommendation";
import { getRecommendations } from "../../services/Track";
import { Button } from "@mui/material";

interface ISongsSectionProps {
  groupId: string;
}

const SongsSection: FC<ISongsSectionProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<IRecommendedSong[]>(
    []
  );

  const onAddSong = () => {
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
      <Playlist groupId={groupId} />
      <Recommendation recommendations={recommendations} />
      <Button onClick={onAddSong}>Add Song</Button>
    </div>
  );
};

export default SongsSection;
