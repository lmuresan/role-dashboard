import React, { FunctionComponent } from "react";
import classnames from "classnames";

import "./Button.scss";

type ButtonClickCallback = () => void;

export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export type ButtonProps = {
  label: string;
  onClick: ButtonClickCallback;
  type?: ButtonType;
  fullWidth?: boolean;
};

const Button: FunctionComponent<ButtonProps> = ({ label, onClick, type = ButtonType.SECONDARY, fullWidth = false }) => {
  const classNameString = classnames("btn", {
    "btn-primary": type === ButtonType.PRIMARY,
    "btn-secondary": type === ButtonType.SECONDARY,
    "btn-full-width": fullWidth,
  });

  const handleClick = () => {
    onClick();
  };

  return (
    <>
      <button className={classNameString} onClick={handleClick}>
        {label}
      </button>
    </>
  );
};

export default Button;
