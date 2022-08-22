import React, { FC, ReactNode } from "react";

import { Button } from "antd";
export interface ISearchRightItem {
  /**查询回调 */
  onSearchHandle?: any;
  /**重置回调 */
  onResetHandle?: any;
  /**自定义按钮 */
  children?: ReactNode;
}
export const SearchRight: FC<ISearchRightItem> = (props) => {
  const { onSearchHandle, onResetHandle, children } = props;
  if (children) {
    return <div className="search-right">{children}</div>;
  } else {
    return (
      <div className="search-right">
        <Button type="primary" onClick={onSearchHandle}>
          查询
        </Button>
        <Button type="default" onClick={onResetHandle}>
          重置
        </Button>
      </div>
    );
  }
};
export default SearchRight;
