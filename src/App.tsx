import React, { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import { Button } from "@mui/material";

function App() {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);
  return (
    <div className="App">
      {haveAccount ? <SignIn /> : <SignUp />}{" "}
      <Button onClick={() => setHaveAccount(!haveAccount)}>
        {haveAccount
          ? "Don't have account? Signup"
          : "ALready have account? Sign in"}
      </Button>
    </div>
  );
}

export default App;
