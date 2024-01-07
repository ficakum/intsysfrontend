import { FC, useState } from "react";
import Playlist from "../Playlist";
import { Song } from "../../models";
import Recommendation from "../Recommendation";

interface ISongsSectionProps {
  groupId: string;
}

const SongsSection: FC<ISongsSectionProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<Song[]>([]);

  return (
    <div>
      <Playlist groupId={groupId} setRecommendations={setRecommendations} />
      <Recommendation recommendations={recommendations} />
    </div>
  );
};

export default SongsSection;
