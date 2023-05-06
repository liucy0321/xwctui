import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import Card from "./card";
import { Button } from "antd";
import Footer from "../Footer/index";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "Card",
  component: Card,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;
export const ADefault = Template.bind({});
ADefault.args = {
  title: "标替",
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
  const [visible, setVisible] = useState(true);
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
      <Card title="标题">fffffffffffff</Card>
      <Footer footerDom={footerDom} />
    </>
  );
};
BButtonWithSize.storyName = "card案例";
