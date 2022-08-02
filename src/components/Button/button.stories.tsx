import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import Button from "./button";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "Button按钮",
  component: Button,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const ADefault = Template.bind({});
ADefault.args = {
  children: "Default Button",
};
ADefault.storyName = "默认按钮样式";
export const BButtonWithSize = () => (
  <>
    <Button size="large"> large button </Button>
    <Button size="small"> small button </Button>
  </>
);
BButtonWithSize.storyName = "不同尺寸的按钮";

export const CButtonWithType = () => (
  <>
    <Button type="primary"> primary button </Button>
    <Button danger> danger button </Button>
    <Button type="link" href="https://google.com">
      {" "}
      link button{" "}
    </Button>
  </>
);

CButtonWithType.storyName = "不同类型的按钮";
