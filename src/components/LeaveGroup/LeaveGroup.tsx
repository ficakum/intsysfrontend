import { Button } from "@mui/material";
import { FC } from "react";
import { leaveGroup } from "../../services/Group";

interface ILeaveGroupProps {
  groupId: string;
}

const LeaveGroup: FC<ILeaveGroupProps> = ({ groupId }) => {
  const onLeaveGroup = () => {
    leaveGroup(groupId)
      .then(() => alert("Successfully left the group"))
      .catch((error: unknown) => console.log(error));
  };

  return (
    <div>
      <Button onClick={onLeaveGroup}>Leave Group</Button>
    </div>
  );
};

export default LeaveGroup;
