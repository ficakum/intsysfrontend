import { useState } from "react";
import { Button } from "@mui/material";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Header from "../../components/Header";
import "./Auth.scss"

const Auth = () => {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);

  return (
  <div className="auth-main">
    <Header showMenu="false" group="" />
    <div className="auth">
      {haveAccount ? <SignIn /> : <SignUp />}
      <Button className = "btn-have-acc" onClick={() => setHaveAccount(!haveAccount)}>
        {haveAccount
          ? "Don't have account? Sign up"
          : "ALready have account? Sign in"}
      </Button>
    </div>
  </div>
  );
};

export default Auth;
