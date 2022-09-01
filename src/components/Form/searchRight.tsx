import React, { FC, ReactNode } from "react";

import { Button, Dropdown, Menu } from "antd";

import { EllipsisOutlined } from "@ant-design/icons";
const { Item } = Menu;
interface IOtherBtnProps {
  icon?: ReactNode;
  name?: string;
  onClick?: any;
}
export interface ISearchRightItem {
  /**查询回调 */
  onSearchHandle?: any;
  /**重置回调 */
  onResetHandle?: any;
  /**自定义按钮 */
  children?: ReactNode;
  /**按钮禁用权限 */
  disBtnRoutes?: string[];
  /**隐藏默认按钮 */
  hideDefBtn?: boolean;
  /**添加的额外btn */
  otherBtn?: IOtherBtnProps[];
}
export const SearchRight: FC<ISearchRightItem> = (props) => {
  const {
    onSearchHandle,
    onResetHandle,
    children,
    disBtnRoutes,
    hideDefBtn,
    otherBtn,
  } = props;
  const menu = (
    <Menu>
      {otherBtn?.map((item, index) => (
        <Item key={index} onClick={item?.onClick}>
          <div>
            {item?.icon}
            {item?.name}
          </div>
        </Item>
      ))}
    </Menu>
  );
  if (children) {
    return (
      <div className="search-right">
        {children}
        {otherBtn ? (
          <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
            <Button type="default">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ) : null}
      </div>
    );
  } else {
    return (
      <div className="search-right">
        {!hideDefBtn ? (
          <>
            <Button
              type="primary"
              onClick={onSearchHandle}
              disabled={disBtnRoutes?.indexOf("query") === 0}
            >
              查询下
            </Button>
            <Button
              type="default"
              onClick={onResetHandle}
              disabled={disBtnRoutes?.indexOf("query") === 0}
            >
              重置
            </Button>
          </>
        ) : null}
        {otherBtn ? (
          <Dropdown placement="bottomRight" overlay={menu} trigger={["click"]}>
            <Button type="default">
              <EllipsisOutlined />
            </Button>
          </Dropdown>
        ) : null}
      </div>
    );
  }
};
export default SearchRight;
