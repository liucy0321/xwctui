import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import HoverWindow from "./hoverWindow";
import Footer from "../Footer/index";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "HoverWindow",
  component: HoverWindow,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof HoverWindow>;

const Template: ComponentStory<typeof HoverWindow> = (args) => (
  <HoverWindow {...args} />
);
export const ADefault = Template.bind({});
ADefault.args = {
  children: "空白",
};
ADefault.storyName = "空白";

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
  const [visible, setVisible] = useState(false);
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
  useEffect(() => {
    setVisible(true);
  }, []);
  return (
    <>
      <HoverWindow visible={visible} setVisible={setVisible}>
        <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p>
        <p>323232</p>
      </HoverWindow>
      <Footer footerDom={footerDom} />
    </>
  );
};
BButtonWithSize.storyName = "案例";
