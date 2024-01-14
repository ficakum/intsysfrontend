import { useEffect, useState } from "react";
import Groups from "../../components/Groups";
import { IUser, initialUser } from "../../models";
import { getLoggedInUser } from "../../services/Auth";
import PlaySong from "../../components/PlaySong";
import SongsSection from "../../components/SongsSection";
import CreateGroup from "../../components/CreateGroup";

const Welcome = () => {
  const [user, setUser] = useState<IUser>(initialUser);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      setUser(user);

      return;
    });
  });

  return (
    <div>
      {user.group ? (
        <div>
          <PlaySong groupId={user.group} />
          <SongsSection groupId={user.group} />
        </div>
      ) : (
        <div>
          <CreateGroup />
          <Groups />
        </div>
      )}
    </div>
  );
};

export default Welcome;
