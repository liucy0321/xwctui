import React, { ReactNode, FC } from "react";
import classNames from "classnames";

export interface ISearchLeftItem {
  children?: ReactNode;
  className?: string;
  style?: any;
}
export const SearchLeft: FC<ISearchLeftItem> = (props) => {
  const { children, className, style } = props;
  const classes = classNames(className, "search-left");
  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};
export default SearchLeft;
