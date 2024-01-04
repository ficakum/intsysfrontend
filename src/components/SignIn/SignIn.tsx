import { ChangeEvent, HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";

import "./SignIn.scss";
import { Button, Input } from "@mui/material";

interface ISignInProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignIn = ({ className }: ISignInProps) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateUsername = (username: string) => {
    const regex = /^[a-zA-Z0-9_-]+$/;
    const isValidUsername = regex.test(username);
    setIsUsernameInvalid(!isValidUsername);
  };

  const validatePassword = (password: string) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const isValidPassword = regex.test(password);
    setIsPasswordInvalid(!isValidPassword);
  };

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newUsername = event.target.value;
    setUsername(newUsername);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
  };

  const onSignIn = () => {
    validateUsername(username);
    validatePassword(password);

    return;
  };

  return (
    <div className={cx("signin", className)}>
      <Input
        className="signin-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        error={isUsernameInvalid}
        onChange={handleUsernameChange}
      />
      <Input
        className="signin-password"
        ref={passwordInputRef}
        type="text"
        placeholder="Enter password"
        error={isPasswordInvalid}
        onChange={handlePasswordChange}
      />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onSignIn()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}>
        Sign in
      </Button>
    </div>
  );
};

export default SignIn;
