import React, { FC, useEffect } from "react";
import classNames from "classnames";

import { Descriptions as AntDescriptions } from "antd";
import { DescriptionsItemProps as AntDescriptionsItemProps } from "antd/lib/descriptions/Item";
const { Item } = AntDescriptions;
interface IPropsItem {
  span?: number;
  titleSpan?: number;
}
export type IProps = AntDescriptionsItemProps & IPropsItem;

export const FormItem: FC<IProps> = (props) => {
  debugger;
  const { children, span, titleSpan, className, ...restProps } = props;
  useEffect(() => {
    debugger;
  }, []);
  function getWidthCol(col) {
    debugger;
    const aaa = 100 / 24;
    return aaa * col + "%";
  }
  const classes = classNames(className, {});
  return (
    <Item className={classes} {...restProps}>
      {children}
    </Item>
  );
};
export default FormItem;
