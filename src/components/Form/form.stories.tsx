import React from "react";
import { ComponentMeta } from "@storybook/react";
import Form from "./index";
import { validateStowage } from "./form";
import { Button, Select, Input, DatePicker, Radio, Checkbox } from "antd";
const { Option } = Select;
const { RangePicker } = DatePicker;
const { Item, SearchLeft, SearchRight } = Form;
const meta: ComponentMeta<typeof Form> = {
  title: "Form 表单",
  id: "Form",
  component: Form,
  //   subcomponents: { Item: Item },
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <Story />
      </div>
    ),
  ],
  //   parameters: {
  //     docs: {
  //       source: {
  //         type: "code",
  //       },
  //     },
  //   },
};
export default meta;
export const ABasicForm = (args) => {
  return (
    <Form {...args}>
      <SearchLeft>
        <Item
          label="用户名"
          name="name"
          width="double"
          noBorder
          rules={[{ type: "string", required: true, min: 3 }]}
        >
          <Input />
        </Item>
        <Item
          label="密码"
          name="password"
          disabled
          rules={[{ type: "string", required: true, min: 3, max: 8 }]}
        >
          <Input type="password" />
        </Item>
      </SearchLeft>
      <SearchRight>
        <Button type="primary" htmlType="submit">
          查fd询
        </Button>
        <Button type="default">重置</Button>
      </SearchRight>
    </Form>
  );
};
ABasicForm.storyName = "基本的登陆表单";

export const BRegForm = (args) => {
  const initialValues = {
    email: "fdsfdsfds",
  };
  return (
    <Form {...args} initialValues={initialValues}>
      <SearchLeft>
        <Item
          label="邮件"
          name="email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Item>
        <Item
          label="密码"
          name="password"
          rules={[{ type: "string", required: true, min: 3, max: 8 }]}
        >
          <Input type="password" />
        </Item>
        <Item
          label="性别"
          noLabel
          name="gender"
          rules={[{ type: "string", required: true }]}
          getValueFromEvent={(e) => e}
          valuePropName="defaultValue"
        >
          <Select placeholder="请选择性别">
            <Option value="男">男</Option>
            <Option value="女">女</Option>
          </Select>
        </Item>
      </SearchLeft>
    </Form>
  );
};
BRegForm.storyName = "注册表单，支持多种 FormItem 组件";
export const CFullForm = (args) => {
  const [form] = Form.useForm();
  const onSearchHandle = () => {
    validateStowage(form);
  };
  /**
   * @description 重置表单数据
   */
  function onResetHandle() {
    form.resetFields();
  }
  return (
    <Form form={form} name="finance-in-list">
      <SearchLeft>
        <Item label="Username" name="username">
          <Input allowClear autoComplete="off" />
        </Item>
        <Item>
          <Input.Group compact>
            <Item
              name={["address", "province"]}
              noStyle
              rules={[{ required: true, message: "哈回复" }]}
            >
              <Select placeholder="请选择" allowClear>
                <Option value="Zhejiang">Zhejiang</Option>
                <Option value="Jiangsu">Jiangsu</Option>
              </Select>
            </Item>
            <Item
              name={["address", "street"]}
              noStyle
              rules={[{ required: true, message: "Street is required" }]}
            >
              <Input allowClear autoComplete="off" style={{ width: "70%" }} />
            </Item>
          </Input.Group>
        </Item>
        <Item
          label="Username2"
          name="username2"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <DatePicker />
        </Item>
        <Item
          label="Username3"
          name="username3"
          rules={[{ required: true, message: "Please input your username!" }]}
          validateStatus="error"
        >
          <Select placeholder="请选择" allowClear>
            <Select.Option value="nihao">fdfd</Select.Option>
            <Select.Option value="12">fds</Select.Option>
            <Select.Option value="32">fds</Select.Option>
            <Select.Option value="43">fds</Select.Option>
          </Select>
        </Item>
        <Item
          label="Username4"
          name="username4"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Item>
        <Item
          label="Username5"
          name="username5"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <RangePicker />
        </Item>
        <Item
          label="Username6"
          name="username6"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Radio.Group>
            <Radio value="apple"> Apple </Radio>
            <Radio value="pear"> Pear </Radio>
            <Radio value="pear"> Pear </Radio>
          </Radio.Group>
        </Item>
        <Item
          label="Username7"
          name="username7"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Checkbox>Checkbox</Checkbox>
        </Item>
        <Item
          label="Username7"
          name="username7"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input.TextArea rows={2} />
        </Item>
        <Item
          label="Username7"
          name="username7"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input.TextArea rows={3} />
        </Item>
      </SearchLeft>
      <SearchRight
        onSearchHandle={onSearchHandle}
        onResetHandle={onResetHandle}
      />
    </Form>
  );
};

CFullForm.storyName = "自定义规则，调用表单实例";
