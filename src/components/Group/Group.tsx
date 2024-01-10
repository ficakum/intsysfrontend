import { FC } from "react";
import { IGroup } from "../../models";
import { Button } from "@mui/material";
import { joinGroup } from "../../services/Group";

interface IGroupProps {
  group: IGroup;
}

const Group: FC<IGroupProps> = ({ group }) => {
  const onJoinGroup = () => {
    joinGroup(group.id)
      .then(() => alert("Successfully joined the group"))
      .catch((error: unknown) => console.log(error));
    return;
  };

  return (
    <div>
      <p>Group name: {group.groupName}</p>
      <p>Member count: {group.membersNum}/{group.maxMembers}</p>
      <Button onClick={onJoinGroup}>Join group</Button>
    </div>
  );
};

export default Group;
