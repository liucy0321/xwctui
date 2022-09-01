import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Spin } from "antd";
interface IContainerProps {
  loading?: boolean;
  className?: string;
  children?: any;
  noFooter?: boolean;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const Container: FC<IContainerProps> = (props) => {
  const { loading, className, children, noFooter } = props;
  const classes = classNames(className, "container-div");
  const style = {
    height: noFooter ? "calc(100% - 40px)" : "calc(100% - 80px)",
  };
  return (
    <div style={style} className="xwct-container">
      <Spin spinning={loading} indicator={antIcon}>
        <div className={classes}>{children}</div>
      </Spin>
    </div>
  );
};
Container.defaultProps = {
  loading: false,
};
export default Container;
