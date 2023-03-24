import React from "react";
import { Form as AntForm, message, Spin } from "antd";
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
  const { children, form, loading, ...restProps } = props;
  return (
    <Spin spinning={loading || false} wrapperClassName="xwct_form_spin">
      <AntForm
        form={form}
        labelAlign="left"
        layout="inline"
        className="xwct-form"
        {...restProps}
      >
        {children}
      </AntForm>
    </Spin>
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
