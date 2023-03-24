import React, { FC, ReactElement } from "react";
import { Layout, Button, Pagination, Dropdown } from "antd";
import classNames from "classnames";

const { Footer } = Layout;
interface IPagination {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number, pageSize: number | undefined) => void;
  onShowSizeChange?: (current: number, size: number) => void;
}
interface IBtn {
  type?: any;
  size?: "large" | "middle" | "small";
  text: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  ifHide?: boolean;
  danger?: boolean;
  ghost?: boolean;
  onClick:
    | ((event: React.MouseEvent<HTMLElement, MouseEvent>) => void)
    | undefined;
}
interface IDropdown {
  text: string;
  overlay: any;
}
export interface IFooterDom extends Partial<IPagination & IBtn & IDropdown> {
  DOMType?: "button" | "pagination" | "dropdown";
  render?: () => ReactElement;
}
interface IProps {
  footerDom?: IFooterDom[] | null;
  style?: React.CSSProperties;
  className?: string;
}
const pageSizeOptions = ["10", "20", "30", "100"];

export const XwFooter: FC<IProps> = (props) => {
  const { footerDom, className } = props;
  const classes = classNames(className, "button-group");
  return (
    <Footer className="xwct-footer">
      {footerDom ? (
        <div className={classes}>
          {footerDom.map((item, index) => {
            if (item.DOMType === "button") {
              const {
                type,
                size,
                loading,
                disabled,
                ifHide,
                danger,
                ghost,
                onClick,
              } = item;
              return (
                !ifHide && (
                  <Button
                    key={index}
                    type={type}
                    loading={loading}
                    disabled={disabled}
                    size={size}
                    danger={danger}
                    ghost={ghost}
                    onClick={onClick}
                  >
                    {item.text}
                  </Button>
                )
              );
            }
            if (item.DOMType === "pagination") {
              const { total, pageSize, current, onChange, onShowSizeChange } =
                item;
              return (
                <Pagination
                  key={index}
                  total={total}
                  pageSize={pageSize}
                  current={current}
                  onChange={onChange}
                  onShowSizeChange={onShowSizeChange}
                  showTotal={(total) => `共${total}条`}
                  showSizeChanger={true}
                  pageSizeOptions={pageSizeOptions}
                />
              );
            }
            if (item.DOMType === "dropdown") {
              return (
                <Dropdown.Button
                  className="button-droupdown"
                  overlay={item.overlay}
                  key={index}
                >
                  {item.text}
                </Dropdown.Button>
              );
            }
            return null;
          })}
        </div>
      ) : null}
    </Footer>
  );
};

export default XwFooter;
