import { Button, TextField } from "@mui/material";
import { ChangeEvent, useRef, useState } from "react";
import { createGroup } from "../../services/Group";

const CreateGroup = () => {
  const groupNameInputRef = useRef<HTMLInputElement | null>(null);
  const maxMembersInputRef = useRef<HTMLInputElement | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [maxMembers, setMaxMembers] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newGroupName = event.target.value;
    setGroupName(newGroupName);
  };

  const handleMaxMembersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxMembers = event.target.value;
    setMaxMembers(Number.parseInt(newMaxMembers));
  };

  const onCreateGroup = () => {
    if (!groupName) {
      alert("Group name is required");
      return;
    }

    if (maxMembers) {
      createGroup({ groupName, maxMembers, membersNum: 1 }).catch(
        (error: unknown) => {
          console.log(error);
        }
      );
    } else {
      createGroup({ groupName, membersNum: 1 }).catch((error: unknown) => {
        console.log(error);
      });
    }
  };

  return (
    <div>
      <TextField
        className="creategroup-groupname"
        ref={groupNameInputRef}
        type="text"
        placeholder="Enter group name"
        onChange={handleGroupNameChange}
      />
      <TextField
        className="creategroup-maxmembers"
        ref={maxMembersInputRef}
        type="number"
        placeholder="Enter max members"
        onChange={handleMaxMembersChange}
      />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onCreateGroup()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}>
        Create Group
      </Button>
    </div>
  );
};

export default CreateGroup;
