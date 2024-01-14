import { FC, useState } from "react";
import Playlist from "../Playlist";
import { IRecommendedSong } from "../../models";
import Recommendation from "../Recommendation";
import AddSong from "../AddSong";

interface ISongsSectionProps {
  groupId: string;
}

const SongsSection: FC<ISongsSectionProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<IRecommendedSong[]>(
    []
  );

  return (
    <div>
      <Playlist groupId={groupId} />
      <Recommendation
        recommendations={recommendations}
        setRecommendations={setRecommendations}
        groupId={groupId}
      />
      <AddSong groupId={groupId} setRecommendations={setRecommendations} />
    </div>
  );
};

export default SongsSection;
