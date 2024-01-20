import { Dispatch, FC, SetStateAction } from "react";
import { IGroup, IUser } from "../../models";
import { Button } from "@mui/material";
import { joinGroup } from "../../services/Group";
import { getLoggedInUser } from "../../services/Auth";

interface IGroupProps {
  group: IGroup;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const Group: FC<IGroupProps> = ({ group, setUser }) => {
  const onJoinGroup = () => {
    joinGroup(group._id.$oid)
      .then(() => {
        getLoggedInUser()
          .then((user: IUser) => {
            setUser(user);

            return;
          })
          .catch((error: unknown) => {
            console.log(error);
          });
        alert("Successfully joined the group");
      })
      .catch((error: unknown) => console.log(error));
    return;
  };

  return (
    <div>
      <p>Group name: {group.groupName}</p>
      <p>
        Member count: {group.membersNum}/{group.maxMembers}
      </p>
      <Button onClick={onJoinGroup}>Join group</Button>
    </div>
  );
};

export default Group;
