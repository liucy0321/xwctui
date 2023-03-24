import React, { useRef } from "react";
import {
  Input as AntInput,
  InputProps as AntInputProps,
  InputNumberProps,
  InputRef,
} from "antd";
export interface IInputProps {
  ref: any;
}
export type InInputProps = AntInputProps & IInputProps & InputNumberProps;

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

// export const Input = forwardRef(
//   (props: any, ref?: React.Ref<unknown> | undefined) => {
//     const inputRef = useRef<InputRef>(null);
//     const { ...restProps } = props;
//     // 暴露
//     useImperativeHandle(ref, () => ({
//       focus: () => {
//         inputRef.current?.focus();
//       },
//       blur: () => {
//         inputRef.current?.blur();
//       },
//     }));
//     return <AntInput ref={inputRef} {...restProps} />;
//   }
// );
export const Input = (props: any) => {
  const inputRef = useRef<InputRef>(null);
  // useEffect(() => {
  //   inputRef.current?.focus();
  // }, []);
  // export const Input: FC<InInputProps> = (props) => {
  const { ref, ...restProps } = props;

  // 暴露
  return <AntInput ref={inputRef} {...restProps} autoComplete="off" />;
};
export default Input;
// Input.Group = (Vue) => {
//   Vue.component(SearchGroup.name, SearchGroup);
// };
// Input.Group = AntInput.Group;
// Input.Password = AntInput.Password;
// Input.TextArea = AntInput.TextArea;
// Input.Search = AntInput.Search;
// export default Input;

// const Input = (props: any, ref: any) => {
//   // 注意：第二个参数ref是必须要有的！！！
//   const addFormRef = useRef<InputRef>(null); // 这边是定义子组件的表单ref变量，并不是直接使用useRef

//   // onFinish由父组件调用
//   useImperativeHandle(ref, () => ({
//     focus: () => {
//       addFormRef.current?.focus();
//     },
//     blur: () => {
//       addFormRef.current?.blur();
//     },
//   }));

//   const selectStyle = { width: "95%" };

//   return <AntInput ref={addFormRef} />;
// };

// export default Input;
