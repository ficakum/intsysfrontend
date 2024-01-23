import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { AxiosError } from "axios";
import { IGroup, IUser } from "../../models";
import Group from "../Group/Group";
import { getGroups } from "../../services/Group";
import "./Groups.scss"

interface IGroupsProps {
  userId: string;
  setUser: Dispatch<SetStateAction<IUser>>;
}
const Groups: FC<IGroupsProps> = ({ userId, setUser }) => {
  const [groups, setGroups] = useState<Array<IGroup>>([]);

  useEffect(() => {
    getGroups(userId)
      .then((groupsPaginated) => {
        setGroups(groupsPaginated);

        return;
      })
      .catch((error: AxiosError) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="groups">
      {groups.map((group, key) => (
        <Group key={key} group={group} setUser={setUser} />
      ))}
    </div>
  );
};

export default Groups;
