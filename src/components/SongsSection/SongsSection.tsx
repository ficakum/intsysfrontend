import { FC, useEffect, useState } from "react";
import { IRecommendedSong } from "../../models";
import Recommendation from "../Recommendation";
import AddSong from "../AddSong";
import Playlist from "../Playlist";
import { getRecommendations } from "../../services/Track";

interface ISongsSectionProps {
  groupId: string;
}

const SongsSection: FC<ISongsSectionProps> = ({ groupId }) => {
  const [recommendations, setRecommendations] = useState<IRecommendedSong[]>(
    []
  );

  useEffect(() => {
    getRecommendations(groupId)
      .then((response: Array<IRecommendedSong>) => {
        setRecommendations(response);
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

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
