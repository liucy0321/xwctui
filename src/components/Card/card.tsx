import React, { FC } from "react";
import classNames from "classnames";
import { Card as AntCard, CardProps } from "antd";
interface ICardProps {
  title?: string;
  extraTitle?: any;
  className?: string;
  children?: any;
}
export const Card: FC<ICardProps & CardProps> = (props) => {
  const { title, className, children, extraTitle, ...restProps } = props;
  const classes = classNames("mb10", className);
  return (
    <AntCard
      title={
        <>
          <span
            className="blueTitleSpan mb0"
            style={{ display: "inline-block" }}
          >
            {title}
          </span>
          {extraTitle}
        </>
      }
      className={classes}
      size="small"
      {...restProps}
    >
      {children}
    </AntCard>
  );
};
export default Card;
