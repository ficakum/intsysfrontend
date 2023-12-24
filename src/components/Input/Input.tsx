import {
  FocusEvent,
  forwardRef,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useState,
} from "react";

import cx from "classnames";

import "./Input.scss";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  errorMsg?: string;
  hasError?: boolean;
  id?: string;
  label?: string;
}

const Input = forwardRef(
  (
    { id, label, className, hasError, errorMsg, type, ...rest }: InputProps,
    ref
  ) => {
    const [showError, setShowError] = useState<boolean>(hasError ?? false);

    useEffect(() => {
      setShowError(hasError ?? false);
    }, [hasError]);

    const onFocus = (evt: FocusEvent<HTMLInputElement>) => {
      if (rest.onFocus) {
        rest.onFocus(evt);
      }
    };

    return (
      <div className={cx("input", className, { "input-invalid": showError })}>
        {!!label && (
          <label htmlFor={id} className="input-label">
            {label}
          </label>
        )}
        <input
          className="input-field"
          id={id}
          onFocus={onFocus}
          ref={ref as MutableRefObject<HTMLInputElement>}
          type={type}
          {...rest}
        />
        {showError && errorMsg && <p className="input-error">{errorMsg}</p>}
      </div>
    );
  }
);

export default Input;
