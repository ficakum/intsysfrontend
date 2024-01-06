import { FC } from "react";
import { IGroup } from "../../models";

interface IGroupProps {
  group: IGroup;
}

const Group: FC<IGroupProps> = ({ group }) => {
  return (
    <div>
      <p>{group.groupName}</p>
      <p>{group.membersNum}</p>
      <p>{group.maxMembers}</p>
    </div>
  );
};

export default Group;
