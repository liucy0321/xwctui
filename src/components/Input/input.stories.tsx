import React, { useEffect, useRef, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Input } from "./input";
import { InputRef } from "antd";
export default {
  title: "Input",
  id: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
} as unknown as ComponentMeta<typeof Input>;

// const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;
// export const ADefault = Template.bind({});
// ADefault.args = {
//   placeholder: "漂亮的 Input",
// };
// ADefault.storyName = "默认的 Input";
// export const BDisabled = Template.bind({});
// BDisabled.args = {
//   placeholder: "disabled input",
//   disabled: true,
// };
// BDisabled.storyName = "被禁用的 Input";

// export const CIcon = Template.bind({});
// CIcon.args = {
//   placeholder: "input with icon",
// };
// CIcon.storyName = "带图标的 Input";

// export const DSizeInput = () => (
//   <>
//     <Input defaultValue="large size" size="large" />
//     <Input placeholder="small size" size="small" />
//   </>
// );
// DSizeInput.storyName = "大小不同的 Input";
export const EPandInput = () => {
  const inputRef = useRef<any>();
  const [inputaaa, setInputAAA] = useState();
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <Input
        defaultValue="prepend text"
        wrappedComponentRef={(e) => (inputRef.current = e)}
      />
      {/* <Input defaultValue="google" /> */}
    </>
  );
};

EPandInput.storyName = "带前后缀的 Input";
