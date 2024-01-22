import { Button } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { leaveGroup } from "../../services/Group";
import { IUser } from "../../models";
import { getLoggedInUser } from "../../services/Auth";
import "./LeaveGroup.scss"

interface ILeaveGroupProps {
  groupId: string;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const LeaveGroup: FC<ILeaveGroupProps> = ({ groupId, setUser }) => {
  const onLeaveGroup = () => {
    leaveGroup(groupId)
      .then(() => {
        getLoggedInUser()
          .then((user: IUser) => {
            setUser(user);

            return;
          })
          .catch((error: unknown) => {
            console.log(error);
          });

        alert("Successfully left the group");
      })
      .catch((error: unknown) => console.log(error));
  };

  return (
    <div>
      <Button className="leave-btn" onClick={onLeaveGroup}>Leave current group</Button>
    </div>
  );
};

export default LeaveGroup;
