import { HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";

import "./SignUp.scss";
import { Button, Input } from "@mui/material";

interface ISignUpProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignUp = ({ className }: ISignUpProps) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isRepeatPasswordInvalid, setIsRepeatPasswordInvalid] =
    useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatPassword, setRepeatPassword] = useState<string>("");

  const onSignUp = () => {
    return;
  };

  return (
    <div className={cx("signup", className)}>
      <Input
        className="signup-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        error={isUsernameInvalid}
      />
      <Input
        className="signup-email"
        ref={emailInputRef}
        type="text"
        placeholder="Enter email"
        error={isEmailInvalid}
      />
      <Input
        className="signup-password"
        ref={passwordInputRef}
        type="text"
        placeholder="Enter password"
        error={isPasswordInvalid}
      />
      <Input
        className="signup-password"
        ref={repeatPasswordInputRef}
        type="text"
        placeholder="Repeat password"
        error={isRepeatPasswordInvalid}
      />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        onClick={() => onSignUp()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}>
        Sign up
      </Button>
    </div>
  );
};

export default SignUp;
