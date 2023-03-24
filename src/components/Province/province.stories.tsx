import React, { useEffect, useRef } from "react";
import { ComponentMeta } from "@storybook/react";
import { Province } from "./province";
export default {
  title: "Province",
  id: "Province",
  component: Province,
  decorators: [
    (Story) => (
      <div style={{ width: "350px" }}>
        <Story />
      </div>
    ),
  ],
} as unknown as ComponentMeta<typeof Province>;

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
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return (
    <>
      <Province />
      {/* <Input defaultValue="google" /> */}
    </>
  );
};

EPandInput.storyName = "省市区";
