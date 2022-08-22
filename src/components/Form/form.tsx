// import React, {
//   ReactNode,
//   createContext,
//   FC,
//   forwardRef,
//   useImperativeHandle,
// } from "react";
// import useStore, { FormState } from "./useStore";

// import { Form as AntForm, FormProps as AntFormProps, FormInstance } from "antd";

// export type RenderProps = (form: FormState) => ReactNode;
// interface IFormProps {
//   /**表单名称，会作为表单字段 id 前缀使用 */
//   name?: string;
//   /**表单默认值，只有初始化以及重置时生效 */
//   initialValues?: Record<string, any>;
//   children?: ReactNode;
//   // form?: FormInstance<any>;
// }
// export type IFormContext = Pick<
//   ReturnType<typeof useStore>,
//   "dispatch" | "fields" | "validateField"
// > &
//   Pick<IFormProps, "initialValues">;
// export type IFormRef = Omit<
//   ReturnType<typeof useStore>,
//   "fields" | "dispatch" | "form"
// >;

// export type IProps = AntFormProps & IFormProps;
// export const FormContext = createContext<IFormContext>({} as IFormContext);
// export type IFormComponent = typeof Form & {
//   Item: typeof import("antd/lib/form/FormItem").default;
//   List: React.FC<import("antd/lib/form").FormListProps>;
//   ErrorList: typeof import("antd/lib/form/ErrorList").default;
//   useForm: typeof AntForm.useForm;
//   Provider: React.FC<import("antd/lib/form/context").FormProviderProps>;
// };
// export type useForm = typeof AntForm.useForm;
// export const Form: FC<IProps> = (props, ref) => {
//   const { children, ...restProps } = props;
//   // useImperativeHandle(ref, () => {
//   //   return {
//   //     ...restProps,
//   //   };
//   // });
//   // 初始化渲染
//   return (
//     <AntForm
//       labelAlign="left"
//       layout="inline"
//       className="xwct-form"
//       {...restProps}
//     >
//       {children}
//     </AntForm>
//   );
// };

// Form.useForm = AntForm.useForm;
// const TransForm = Form as IFormComponent;
// export default Form;

import React from "react";
import { Form as AntForm, message } from "antd";
import { FormProvider } from "antd/lib/form/context";
import Item from "./formItem";
import SearchLeft from "./searchLeft";
import SearchRight from "./searchRight";
export const validateStowage = (form) => {
  return form
    .validateFields()
    .then((res) => {
      return true;
    })
    .catch((error) => {
      const { errorFields } = error;
      for (let item of errorFields) {
        message.error(item?.errors[0]);
        return false;
      }
      return false;
    });
};
function Form(props) {
  const { children, form, ...restProps } = props;
  return (
    <AntForm
      form={form}
      labelAlign="left"
      layout="inline"
      className="xwct-form"
      {...restProps}
    >
      {children}
    </AntForm>
  );
}
Form.Item = Item;
Form.SearchLeft = SearchLeft;
Form.SearchRight = SearchRight;
Form.List = AntForm.List;
Form.ErrorList = AntForm.ErrorList;
Form.useForm = AntForm.useForm;
Form.Provider = FormProvider;

Form.defaultProps = {
  name: "xwct_form",
};

export default Form;
