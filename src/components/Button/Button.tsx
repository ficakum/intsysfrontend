import { ButtonHTMLAttributes, ReactElement } from "react";
import cx from "classnames";

import "./Button.scss";

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  text: string;
  children?: ReactElement[] | ReactElement;
}

const Button = (props: IButtonProps) => {
  const { text, className, children } = props;
  return (
    <button {...props} className={cx("btn", className)}>
      {children}
      {text}
    </button>
  );
};

export default Button;
