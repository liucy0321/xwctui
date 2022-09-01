import React, { FC } from "react";
import { Input as AntInput, InputProps } from "antd";
export type { InputProps } from "antd/lib/input";
// export interface InInputProps {
//   Group: any;
//   Password: any;
//   TextArea: any;
//   Search: any;
// }

/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * 默认添加autoComplete="off"和allowClear
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'xwctui'
 * ~~~
 *
 */
export const Input = (props) => {
  const { ...restProps } = props;
  return <AntInput autoComplete="off" allowClear {...restProps} />;
};
Input.Group = AntInput.Group;
Input.Password = AntInput.Password;
Input.TextArea = AntInput.TextArea;
Input.Search = AntInput.Search;
export default Input;
