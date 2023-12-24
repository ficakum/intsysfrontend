import React, { useState } from "react";
import "./App.css";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Button from "./components/Button";

function App() {
  const [haveAccount, setHaveAccount] = useState<boolean>(true);
  return (
    <div className="App">
      {haveAccount ? <SignIn /> : <SignUp />}{" "}
      <Button
        text={
          haveAccount
            ? "Don't have account? Signup"
            : "ALready have account? Sign in"
        }
        onClick={() => setHaveAccount(!haveAccount)}
      />
    </div>
  );
}

export default App;
