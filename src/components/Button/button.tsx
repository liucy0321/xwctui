import React, { FC } from "react";
import { Button as AntButton, ButtonProps as AntButtonProps } from "antd";

export type ButtonProps = AntButtonProps;

/**
 * 页面中最常用的的按钮元素，适合于完成特定的交互，支持 HTML button 和 a 链接 的所有属性
 * ### 引用方法
 *
 * ```javascript
 * import { Button } from 'xwctui'
 * ```
 */
export const Button: FC<ButtonProps> = (props) => {
  const { children, ...restProps } = props;
  return <AntButton {...restProps}>{children}</AntButton>;
};
export default Button;
