import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { IGroup, IUser } from "../../models";
import { joinGroup } from "../../services/Group";
import { getLoggedInUser } from "../../services/Auth";
import "./Group.scss"

interface IGroupProps {
  group: IGroup;
  setUser: Dispatch<SetStateAction<IUser>>;
}

const Group: FC<IGroupProps> = ({ group, setUser }) => {
  const onJoinGroup = () => {
    joinGroup(group._id.$oid)
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
    return;
  };
  
  return (
      <Grid item xs={4}> 
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              {group.groupName}
            </Typography>
            <Typography>
              Member count: {group.membersNum}/{group.maxMembers}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="large" onClick={onJoinGroup} className="join-group-btn">Join group</Button>
          </CardActions>
        </Card>
      </Grid>
  );
};

export default Group;
