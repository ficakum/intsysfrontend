import { Button } from "@mui/material";
import { FC } from "react";
import { clearSession } from "../../services/Auth";
import { useNavigate } from "react-router-dom";
import "./SignOut.scss"

const SignOut: FC = () => {
  const navigate = useNavigate();

  const onSignOut = () => {
    clearSession();

    navigate("Auth");
  };

  return (
    <div>
      <Button onClick={onSignOut} className="sing-out-btn">Sign out</Button>
    </div>
  );
};

export default SignOut;
