import { HTMLAttributes, useRef, useState } from "react";
import cx from "classnames";

import "./SignIn.scss";
import Input from "../Input";
import Button from "../Button/Button";

interface ISignInProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const SignIn = ({ className }: ISignInProps) => {
  const usernameInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);
  const [isUsernameInvalid, setIsUsernameInvalid] = useState<boolean>(false);
  const [isPasswordInvalid, setIsPasswordInvalid] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onSignIn = () => {
    return;
  };

  return (
    <div className={cx("signin", className)}>
      <Input
        className="signin-username"
        ref={usernameInputRef}
        type="text"
        placeholder="Enter username"
        hasError={isUsernameInvalid}
      />
      <Input
        className="signin-password"
        ref={passwordInputRef}
        type="text"
        placeholder="Enter password"
        hasError={isPasswordInvalid}
      />
      <Button
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => setIsHovered(false)}
        text="Sign in"
        onClick={() => onSignIn()}
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

export default SignIn;
