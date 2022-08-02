import React, { FC } from "react";
import { Select as AntSelect, SelectProps as AntSelectProps } from "antd";

export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}
export type SelectProps = AntSelectProps;
/**
 * 下拉选择器。
 * 弹出一个下拉菜单给用户选择操作，用于代替原生的选择器，或者需要一个更优雅的多选器时。
 * ### 引用方法
 *
 * ~~~js
 * import { Select } from 'xwctui'
 * // 然后可以使用 <Select> 和 <Select.Option>
 * ~~~
 */
export const Select: FC<SelectProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    <AntSelect {...restProps} className="xwct-select">
      {children}
    </AntSelect>
  );
};
Select.defaultProps = {
  placeholder: "请选择",
};
export default Select;
