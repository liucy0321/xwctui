import React, { FC } from "react";
import classNames from "classnames";

import { Form as AntForm, FormItemProps as AntFormItemProps } from "antd";
const { Item } = AntForm;
interface IFormItem {
  width?: "half" | "all" | "double" | "halfAll";
  /**没有边框 */
  noBorder?: boolean;
  /**没有label */
  noLabel?: boolean;
  /**是否禁用 */
  disabled?: boolean;
}
export type IFormItemProps = AntFormItemProps & IFormItem;

export const FormItem: FC<IFormItemProps> = (props) => {
  const {
    children,
    width,
    className,
    noBorder,
    noLabel,
    disabled,
    ...restProps
  } = props;
  function getWidthStr(width) {
    switch (width) {
      case "half":
        return "calc(16.6% - 10px)";
      case "all":
        return "calc(100% - 10px)";
      case "double":
        return "calc(66.6% - 10px)";
      case "halfAll":
        return "calc(50% - 10px)";
      default:
        return "calc(33.3% - 10px)";
    }
  }
  const classes = classNames(className, {
    "form-item-noborder": noBorder,
    "form-item-noLabel": noLabel,
    "form-item-disabled": disabled,
  });
  return (
    <Item
      className={classes}
      style={{ width: getWidthStr(width) }}
      {...restProps}
    >
      {children}
    </Item>
  );
};
export default FormItem;
