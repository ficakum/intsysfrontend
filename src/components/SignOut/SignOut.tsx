import { Button } from "@mui/material";
import { FC } from "react";
import { clearSession } from "../../services/Auth";
import { useNavigate } from "react-router-dom";

const SignOut: FC = () => {
  const navigate = useNavigate();

  const onSignOut = () => {
    clearSession();

    navigate("Auth");
  };

  return (
    <div>
      <Button onClick={onSignOut}>Sign out</Button>
    </div>
  );
};

export default SignOut;
