import React, { ReactElement, useMemo } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import Container from "./container";
import Footer from "../Footer/index";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "Container",
  component: Container,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof Container>;

const Template: ComponentStory<typeof Container> = (args) => (
  <Container {...args} />
);
export const ADefault = Template.bind({});
ADefault.args = {
  children: "无loading",
};
ADefault.storyName = "默认";

export const BButtonWithSize = () => {
  interface IPagination {
    total: number;
    pageSize: number;
    current: number;
    onChange: (page: number, pageSize: number | undefined) => void;
    onShowSizeChange?: (current: number, size: number) => void;
  }
  interface IBtn {
    type?: any;
    text: React.ReactNode;
    loading?: boolean;
    disabled?: boolean;
    onClick:
      | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
      | undefined;
  }
  interface IDropdown {
    text: string;
    overlay: any;
  }
  interface IFooterDom extends Partial<IPagination & IBtn & IDropdown> {
    DOMType?: "button" | "pagination" | "dropdown";
    render?: () => ReactElement;
  }
  const footerDom = useMemo<IFooterDom[]>(
    () => [
      {
        DOMType: "pagination",
        total: 12,
        current: 12,
        pageSize: 12,
      },
    ],
    []
  );
  return (
    <>
      <Container loading={true}>
        <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p>
        <p>323232</p>
      </Container>
      <Footer footerDom={footerDom} />
    </>
  );
};
BButtonWithSize.storyName = "loading样式";
