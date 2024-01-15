import { useState } from "react";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import { Button } from "@mui/material";

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);
  return (
    <div className="auth">
      {haveAccount ? <SignIn /> : <SignUp />}{" "}
      <Button onClick={() => setHaveAccount(!haveAccount)} style={{marginLeft: 565}}>
        {haveAccount
          ? "Don't have account? Signup"
          : "ALready have account? Sign in"}
      </Button>
    </div>
  );
};

export default Auth;
