import React, { FC } from "react";
import classNames from "classnames";
import { Button as AntButton, ButtonProps } from "antd";

interface IButtonProps {
  ifAntBtn?: boolean;
}

export const Button: FC<IButtonProps & ButtonProps> = (props) => {
  const { type, ifAntBtn, className, children, disabled, ...restProps } = props;
  let classes = classNames(className, type === "link" && "link-span");
  if (disabled) {
    classes = classNames(className, "dis-link-span");
  }
  return (
    <>
      {type === "link" && !ifAntBtn ? (
        <span className={classes} {...restProps}>
          {children}
        </span>
      ) : (
        <AntButton
          className={classes}
          type={type}
          disabled={disabled}
          {...restProps}
        >
          {children}
        </AntButton>
      )}
    </>
  );
};
export default Button;
