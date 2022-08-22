import React, { FC, ReactNode } from "react";
import { Select } from "antd";
const { Option: AntOption } = Select;
export interface SelectOptionProps {
  index?: string;
  /** 默认根据此属性值进行筛选，该值不能相同*/
  value: string;
  /** 选项的标签，若不设置则默认与 value 相同*/
  label?: string;
  /** 是否禁用该选项*/
  disabled?: boolean;
  children?: ReactNode;
}

export const Option: FC<SelectOptionProps> = (props) => {
  const { children, ...restProps } = props;

  return <AntOption {...restProps}>{children}</AntOption>;
};

Option.displayName = "Option";

export default Option;
