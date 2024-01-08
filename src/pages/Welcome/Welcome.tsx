import { useEffect, useState } from "react";
import Groups from "../../components/Groups";
import { IUser, initialUser } from "../../models";
import { getLoggedInUser } from "../../services/Auth";
import PlaySong from "../../components/PlaySong";
import SongsSection from "../../components/SongsSection";

const Welcome = () => {
  const [user, setUser] = useState<IUser>(initialUser);

  useEffect(() => {
    getLoggedInUser().then((user) => {
      setUser(user);
    });
  });

  return (
    <div>
      {user.group ? (
        <div>
          <PlaySong groupId={user.group} songLink="" />
          <SongsSection groupId={user.group} />
        </div>
      ) : (
        <Groups />
      )}
    </div>
  );
};

export default Welcome;
