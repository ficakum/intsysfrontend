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
      <p>{group.groupName}</p>
      <p>{group.membersNum}</p>
      <p>{group.maxMembers}</p>
      <Button onClick={onJoinGroup}>Join group</Button>
    </div>
  );
};

export default Group;
