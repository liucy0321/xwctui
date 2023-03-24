import React, { ReactElement, useEffect, useMemo, useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import XwctPopover from "./xwctPopover";
import { Button } from "antd";
import Footer from "../Footer/index";

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: "XwctPopover",
  component: XwctPopover,
  // parameters: {
  //   docs: {
  //     page: WelcomeMDX
  //   }
  // }
} as ComponentMeta<typeof XwctPopover>;

const Template: ComponentStory<typeof XwctPopover> = (args) => (
  <XwctPopover {...args} />
);
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
      <XwctPopover
        visible={visible}
        setVisible={setVisible}
        placement="topRight"
        content={
          <>
            <p>23</p>
            <p>32</p>
            <p>fffffffffffffff</p>
          </>
        }
      >
        <Button onClick={() => setVisible(true)}>fdjkfd</Button>
      </XwctPopover>
      <Footer footerDom={footerDom} />
    </>
  );
};
BButtonWithSize.storyName = "案例";
