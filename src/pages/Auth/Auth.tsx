import { useState } from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import { Button } from "@mui/material";
import "./Auth.scss"

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);
  return (
    <div className="auth">
      {haveAccount ? <SignIn /> : <SignUp />}
      <Button className = "btn-have-acc" onClick={() => setHaveAccount(!haveAccount)}>
        {haveAccount
          ? "Don't have account? Signup"
          : "ALready have account? Sign in"}
      </Button>
    </div>
  );
};

export default Auth;
