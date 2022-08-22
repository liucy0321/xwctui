import React, { ReactNode, FC } from "react";

export interface ISearchLeftItem {
  children: ReactNode;
}
export const SearchLeft: FC<ISearchLeftItem> = (props) => {
  const { children } = props;
  return <div className="search-left">{children}</div>;
};
export default SearchLeft;
