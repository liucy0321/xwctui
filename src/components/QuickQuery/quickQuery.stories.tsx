import React, { ReactElement, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import QuickQuery from "./quickQuery";
import Footer from "../Footer/index";
import { Button } from "antd";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "QuickQuery",
  component: QuickQuery,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof QuickQuery>;

const Template: ComponentStory<typeof QuickQuery> = (args) => (
  <QuickQuery {...args} />
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
  return (
    <>
      <QuickQuery
        topNode={"aaa"}
        visible={visible}
        onClickByTopNow={() => {
          setVisible(!visible);
        }}
      >
        <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p> <p>323232</p>
        <p>323232</p>
      </QuickQuery>
      <Footer footerDom={footerDom} />
    </>
  );
};
BButtonWithSize.storyName = "案例";
