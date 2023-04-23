import React, { FC } from "react";
import classNames from "classnames";
import { Drawer, Checkbox, DrawerProps } from "antd";
import { DoubleLeftOutlined } from "@ant-design/icons";
interface IQuickQueryProps {
  topNode?: any;
  className?: string;
  height?: any;
  children?: any;
  width?: number;
  drawerData?: any;
  onClickByTopNow?: () => void;
  visible?: boolean;
  drawerTitle?: string;
  minHeight?: number;
  hideRight?: boolean;
}
export const QuickQuery: FC<IQuickQueryProps & DrawerProps> = (props) => {
  const {
    className,
    topNode,
    height,
    children,
    width,
    drawerData,
    visible,
    drawerTitle,
    minHeight,
    hideRight,
    onClickByTopNow,
    ...restProps
  } = props;
  // const [visible, setVisible] = useState(false);
  const classes = classNames(className, "quick_query_div");
  // const onClickByTopNow = () => {
  //   setVisible(!visible);
  // };
  // const onClose = () => {
  //   setVisible(false);
  // };
  const copywidth = width ? width + "px" : "300px";
  return (
    <div className={classes} style={{ height: height || "calc(100% - 43px)" }}>
      <div
        style={{
          marginRight: visible && !hideRight ? copywidth : "0",
          height: "100%",
        }}
      >
        <p className="top_now_dept">
          {typeof topNode === "string" ? <b>{topNode}</b> : topNode}
          <DoubleLeftOutlined
            onClick={onClickByTopNow}
            rotate={visible ? 180 : 0}
            style={{
              display: hideRight ? "none" : "block",
            }}
          />
        </p>
        {children}
      </div>
      <div className={hideRight ? "hide-right-css" : ""}>
        <Drawer
          title={drawerTitle}
          placement="right"
          open={visible}
          width={width || 300}
          height={500}
          mask={false}
          closable={false}
          getContainer={false}
          extra={<Checkbox>显示下级</Checkbox>}
          {...restProps}
          style={{
            minHeight: minHeight + "px" || "0px",
          }}
        >
          {drawerData}
        </Drawer>
      </div>
    </div>
  );
};
export default QuickQuery;
