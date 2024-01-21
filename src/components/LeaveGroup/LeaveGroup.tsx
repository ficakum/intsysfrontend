import { Button } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { leaveGroup } from "../../services/Group";
import { IUser } from "../../models";
import { getLoggedInUser } from "../../services/Auth";

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
      <Button onClick={onLeaveGroup}>Leave Group</Button>
    </div>
  );
};

export default LeaveGroup;
