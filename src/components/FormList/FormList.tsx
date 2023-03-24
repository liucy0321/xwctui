import React, { useEffect } from "react";
import { Descriptions as AntDescriptions, DescriptionsProps } from "antd";
import classNames from "classnames";
import FormItem from "./FormItem";
import "../../style.scss";
/**
 * 表单传入参数类型定义
 */
interface IDescProps {}
function FormList(props: IDescProps & DescriptionsProps) {
  const { children, className, ...restProps } = props;
  const classes = classNames(className, {});
  return (
    <div className="grid-container">
      <AntDescriptions className={classes} {...restProps}>
        {children}
      </AntDescriptions>
    </div>
  );
}
FormList.FormItem = FormItem;
export default FormList;
