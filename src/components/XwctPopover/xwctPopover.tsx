import React, { FC } from "react";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
import { Popover, PopoverProps } from "antd";
interface IHoverWindowProps {
  className?: string;
  height?: any;
  children?: any;
  width?: number;
  visible: boolean;
  setVisible: any;
  content: any;
}
export const XwctPopover: FC<IHoverWindowProps & PopoverProps> = (props) => {
  const {
    className,
    height,
    children,
    width,
    visible,
    setVisible,
    content,
    ...restProps
  } = props;
  const classes = classNames(className, "xwct_popover");
  const copywidth = width ? width + "px" : "500px";
  const copyHeight = height ? height + "px" : "200px";
  // 关闭浮窗
  const onCloseByWidow = () => {
    setVisible(false);
  };
  return (
    <Popover
      open={visible}
      content={
        <div
          className={classes}
          style={{
            width: copywidth,
            maxHeight: copyHeight,
            padding: "10px",
          }}
        >
          <CloseOutlined
            onClick={onCloseByWidow}
            className="xwct_popover_close"
          />
          <div className="hover_children_div">{content}</div>
        </div>
      }
      trigger="click"
      {...restProps}
    >
      {children}
    </Popover>
  );
};
export default XwctPopover;
