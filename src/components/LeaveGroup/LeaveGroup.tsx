import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@mui/material";
import { IUser } from "../../models";
import { leaveGroup } from "../../services/Group";
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

      })
      .catch((error: unknown) => console.log(error));
  };

  return (
    <div>
      <Button className="leave-btn" onClick={onLeaveGroup}>Leave group</Button>
    </div>
  );
};

export default LeaveGroup;
