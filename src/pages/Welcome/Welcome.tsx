import { useEffect, useState } from "react";
import { IUser, initialUser } from "../../models";
import Groups from "../../components/Groups";
import PlaySong from "../../components/PlaySong";
import SongsSection from "../../components/SongsSection";
import CreateGroup from "../../components/CreateGroup";
import LeaveGroup from "../../components/LeaveGroup";
import Header from "../../components/Header";
import { getLoggedInUser } from "../../services/Auth";
import "./Welcome.scss"

const Welcome = () => {
  const [user, setUser] = useState<IUser>(initialUser);

  useEffect(() => {
    getLoggedInUser()
      .then((user: IUser) => {
        setUser(user);

        return;
      })
      .catch((error: unknown) => {
        console.log(error);
      });
  }, []);

  if (user === initialUser) {
    return null;
  }

  return (
    <div className="welcome-div">
      <Header showMenu="true" />
      {user.group ? (
        <div className="in-group-div">
          <div className="song-and-leave-div"> 
            <PlaySong groupId={user.group} />
            <LeaveGroup groupId={user.group} setUser={setUser} />
          </div>
          <SongsSection groupId={user.group} />
        </div>
      ) : (
        <div className="without-group-div">
          <CreateGroup setUser={setUser} />
          <Groups setUser={setUser} userId={user._id} />
        </div>
      )}
    </div>
  );
};

export default Welcome;
