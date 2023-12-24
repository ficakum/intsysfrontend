import { HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";

import "./SignUp.scss";
import Input from "../Input";
import Button from "../Button/Button";

interface ISignUpProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignUp = ({ className }: ISignUpProps) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const emailInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isUEmailInvalid, setIsEmailInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

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
        hasError={isUsernameInvalid}
      />
      <Input
        className="signup-username"
        ref={emailInputRef}
        type="text"
        placeholder="Enter email"
        hasError={isUEmailInvalid}
      />
      <Input
        className="signup-password"
        ref={passwordInputRef}
        type="text"
        placeholder="Enter password"
        hasError={isPasswordInvalid}
      />
      <Input
        className="signup-password"
        ref={repeatPasswordInputRef}
        type="text"
        placeholder="Repeat password"
        hasError={isPasswordInvalid}
      />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        text="Sign in"
        onClick={() => onSignUp()}
        style={{
          padding: "15px 32px 15px 32px",
          border: isHovered ? "" : "2px solid #4B4B4B",
          color: "#4B4B4B",
          boxShadow: isHovered
            ? "0px 4px 15px 0px #5D5FEF66, 0px -4px 15px 0px #EB000033"
            : "",
        }}
      />
    </div>
  );
};

export default SignUp;
