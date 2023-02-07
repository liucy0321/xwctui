import React, { FC } from "react";
import classNames from "classnames";
import { CloseOutlined } from "@ant-design/icons";
interface IHoverWindowProps {
  className?: string;
  height?: any;
  children?: any;
  width?: number;
  visible: boolean;
  setVisible: any;
}
export const HoverWindow: FC<IHoverWindowProps> = (props) => {
  const { className, height, children, width, visible, setVisible } = props;
  const classes = classNames(className, "hover_window");
  const copywidth = width ? width + "px" : "500px";
  const copyHeight = height ? height + "px" : "200px";
  // 关闭浮窗
  const onCloseByWidow = () => {
    setVisible(false);
  };
  return (
    <div
      className={classes}
      style={{
        display: visible ? "block" : "none",
        width: copywidth,
        maxHeight: copyHeight,
      }}
    >
      <CloseOutlined onClick={onCloseByWidow} />
      <div className="hover_children_div">{children}</div>
    </div>
  );
};
export default HoverWindow;
