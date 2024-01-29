import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IUser, initialUser } from "../../models";
import Groups from "../../components/Groups";
import PlaySong from "../../components/PlaySong";
import SongsSection from "../../components/SongsSection";
import CreateGroup from "../../components/CreateGroup";
import LeaveGroup from "../../components/LeaveGroup";
import Header from "../../components/Header";
import GroupsBackend from "../../components/GroupsBackend";
import { getLoggedInUser } from "../../services/Auth";
import { getGroup } from "../../services/Group";
import "./Welcome.scss";

const Welcome = () => {
  const [user, setUser] = useState<IUser>(initialUser);
  const [group, setGroup] = useState<string>("");

  useEffect(() => {
    getLoggedInUser()
      .then((user: IUser) => {
        setUser(user);
        if (user.group){
          getGroup(user.group)
          .then(
            (response) =>{
              setGroup(response.groupName);
  
              return;
            }
          )
          .catch((error: AxiosError) => {
            console.log(error);
          });
        }

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
      <Header showMenu="true" group={group}/>
      {user.group ? (
        <div className="in-group-div">
          <div className="song-and-leave-div">
            <PlaySong groupId={user.group} />
            <LeaveGroup groupId={user.group} setUser={setUser} setGroup={setGroup} />
          </div>
          <SongsSection groupId={user.group} />
        </div>
      ) : (
        <div className="without-group-div">
          <CreateGroup setUser={setUser} setGroup={setGroup} />
          <Groups setUser={setUser} userId={user._id} setGroup={setGroup}/>
          <GroupsBackend setUser={setUser} setGroup={setGroup}/>
        </div>
      )}
    </div>
  );
};

export default Welcome;
