import React, { FC } from "react";
import classNames from "classnames";
import { Button as AntButton, ButtonProps } from "antd";

interface IButtonProps {}

export const Button: FC<IButtonProps & ButtonProps> = (props) => {
  const { type, className, children, ...restProps } = props;
  const classes = classNames(className, type === "link" && "link-span");
  return (
    <>
      {type === "link" ? (
        <span className={classes} {...restProps}>
          {children}
        </span>
      ) : (
        <AntButton className={classes} type={type} {...restProps}>
          {children}
        </AntButton>
      )}
    </>
  );
};
export default Button;
