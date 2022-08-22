import React, { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { Spin } from "antd";
interface IContainerProps {
  loading?: boolean;
  className?: string;
  children?: any;
}
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
export const Container: FC<IContainerProps> = (props) => {
  const { loading, className, children } = props;
  const classes = classNames(className, "container-div");
  return (
    <div className="xwct-container">
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
