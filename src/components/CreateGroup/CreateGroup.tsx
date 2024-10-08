import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Button, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IUser, IGroup } from "../../models";
import { createGroup } from "../../services/Group";
import { getLoggedInUser } from "../../services/Auth";
import "./CreateGroup.scss";

const theme = createTheme({
  palette: {
    text: {
      primary: "#FFFFFF",
      secondary: "#FFFFFF",
    },
    primary: {
      main: "#FFFFFF",
    },
  },
});

interface ICreateGroupProps {
  setUser: Dispatch<SetStateAction<IUser>>;
  setGroup: Dispatch<SetStateAction<string>>;
}

const CreateGroup: FC<ICreateGroupProps> = ({ setUser, setGroup }) => {
  const groupNameInputRef = useRef<HTMLInputElement | null>(null);
  const maxMembersInputRef = useRef<HTMLInputElement | null>(null);
  const [groupName, setGroupName] = useState<string>("");
  const [maxMembers, setMaxMembers] = useState<number>(0);
  const [isGroupNameInvalid, setIsGroupNameInvalid] = useState<boolean>(false);
  const [isMaxMembersInvalid, setIsMaxMembersInvalid] =
    useState<boolean>(false);

  const validateGroupName = (groupName: string) => {
    const isValidGroupName = groupName;
    setIsGroupNameInvalid(!isValidGroupName);

    return !isValidGroupName;
  };

  const validateMaxMembers = (maxMembers: number) => {
    const isValidMaxMembers = maxMembers >= 0;
    setIsMaxMembersInvalid(!isValidMaxMembers);

    return !isValidMaxMembers;
  };

  const handleGroupNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newGroupName = event.target.value;
    setGroupName(newGroupName);
  };

  const handleMaxMembersChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newMaxMembers = event.target.value;
    if (newMaxMembers != "") {
      setMaxMembers(Number.parseInt(newMaxMembers));
    } else {
      setMaxMembers(0);
    }
  };

  const onCreateGroup = () => {
    let err = validateGroupName(groupName);
    err = validateMaxMembers(maxMembers) || err;

    if (err) {
      return;
    }

    if (maxMembers) {
      createGroup({ groupName, maxMembers, membersNum: 1 })
        .then((group: IGroup) => {
          setGroup(group.groupName);
          getLoggedInUser()
            .then((user: IUser) => {
              setUser(user);

              return;
            })
            .catch((error: unknown) => {
              console.log(error);
            });
        })
        .catch((error) => {
          if(error.response.status === 400 || error.response.status === 500 ){
            setIsGroupNameInvalid(true);
          }
          else{
            console.log(error);
          }
        });
    } else {
      createGroup({ groupName, membersNum: 1 })
        .then((group: IGroup) => {
          setGroup(group.groupName);
          getLoggedInUser()
            .then((user: IUser) => {
              setUser(user);

              return;
            })
            .catch((error: unknown) => {
              console.log(error);
            });
        })
        .catch((error) => {
          if(error.response.status === 400 || error.response.status === 500 ){
            setIsGroupNameInvalid(true);
          }
          else{
            console.log(error);
          }
        });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main">
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <div className="create-group-div">
            <TextField
              sx={{ backgroundColor: "rgba(101, 18, 108, 0.8)" }}
              margin="normal"
              required
              autoFocus
              className="creategroup-groupname"
              ref={groupNameInputRef}
              label="Group name"
              type="text"
              placeholder="Enter group name"
              error={isGroupNameInvalid}
              onChange={handleGroupNameChange}
            />
            <TextField
              sx={{ backgroundColor: "rgba(101, 18, 108, 0.8)" }}
              margin="normal"
              className="creategroup-maxmembers"
              ref={maxMembersInputRef}
              label="Max members"
              type="number"
              InputProps={{ inputProps: { min: 1 } }}
              defaultValue={10}
              placeholder="Enter max members"
              error={isMaxMembersInvalid}
              onChange={handleMaxMembersChange}
            />
            <Button
              className="create-group-btn"
              variant="contained"
              onClick={() => onCreateGroup()}>
              Create Group
            </Button>
          </div>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default CreateGroup;
