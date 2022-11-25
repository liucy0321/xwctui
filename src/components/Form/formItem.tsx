import React, { FC } from "react";
import classNames from "classnames";

import { Form as AntForm, FormItemProps as AntFormItemProps } from "antd";
const { Item } = AntForm;
interface IFormItem {
  width?: "half" | "quarter" | "all" | "double" | "halfAll" | "normal";
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
        return "16.666666% ";
      case "quarter":
        return "25%";
      case "all":
        return "100%";
      case "double":
        return "66.666666%";
      case "halfAll":
        return "50%";
      default:
        return "33.333333%";
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
