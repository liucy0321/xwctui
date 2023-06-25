import React, { useEffect, useRef, useState } from "react";
import { Input as AntInput, InputProps } from "antd";
import classNames from "classnames";
interface IProps extends InputProps {
  [propName: string]: any;

  value?: string;
}

const Input = ({
  value = "",
  onChange,
  onInput,
  onCompositionStart,
  onCompositionEnd,
  className,
  ...resetProps
}: IProps) => {
  const chineseInputting = useRef(false); // 是否是中文（爽字节字符的输入）模式
  const [val, setVal] = useState("");
  const classes = classNames("chineseInput", className);

  useEffect(() => {
    setVal(value);
  }, [value]);

  // 优化搜索
  const change = (e: any) => {
    onChange && onChange(e);
  };

  return (
    <AntInput
      autoComplete="off"
      {...resetProps}
      className={classes}
      value={val}
      onChange={(e: any) => {
        if (e.target.value === "") {
          change(e);
        }
        setVal(e.target.value);
      }}
      onInput={(e: any) => {
        onInput && onInput(e);
        if (!chineseInputting.current) {
          change(e);
        }
      }}
      onCompositionStart={(e: any) => {
        onCompositionStart && onCompositionStart(e);
        chineseInputting.current = true;
      }}
      onCompositionEnd={(e: any) => {
        onCompositionEnd && onCompositionEnd(e);
        if (chineseInputting.current) {
          change(e);
          chineseInputting.current = false;
        }
      }}
    />
  );
};

const InputSearch = ({
  value = "",
  onChange,
  onInput,
  onCompositionStart,
  onCompositionEnd,
  className,
  ...resetProps
}: IProps) => {
  const chineseInputting = useRef(false); // 是否是中文（爽字节字符的输入）模式
  const [val, setVal] = useState("");
  const classes = classNames("chineseInput", className);

  useEffect(() => {
    setVal(value);
  }, [value]);

  // 优化搜索
  const change = (e: any) => {
    onChange && onChange(e);
  };

  return (
    <AntInput.Search
      autoComplete="off"
      {...resetProps}
      className={classes}
      value={val}
      onChange={(e: any) => {
        if (e.target.value === "") {
          change(e);
        }
        setVal(e.target.value);
      }}
      onInput={(e: any) => {
        onInput && onInput(e);
        if (!chineseInputting.current) {
          change(e);
        }
      }}
      onCompositionStart={(e: any) => {
        onCompositionStart && onCompositionStart(e);
        chineseInputting.current = true;
      }}
      onCompositionEnd={(e: any) => {
        onCompositionEnd && onCompositionEnd(e);
        if (chineseInputting.current) {
          change(e);
          chineseInputting.current = false;
        }
      }}
    />
  );
};
const InputPassword = ({
  value = "",
  onChange,
  onInput,
  onCompositionStart,
  onCompositionEnd,
  className,
  ...resetProps
}: IProps) => {
  const chineseInputting = useRef(false); // 是否是中文（爽字节字符的输入）模式
  const [val, setVal] = useState("");
  const classes = classNames("chineseInput", className);

  useEffect(() => {
    setVal(value);
  }, [value]);

  // 优化搜索
  const change = (e: any) => {
    onChange && onChange(e);
  };

  return (
    <AntInput.Password
      autoComplete="off"
      {...resetProps}
      className={classes}
      value={val}
      onChange={(e: any) => {
        if (e.target.value === "") {
          change(e);
        }
        setVal(e.target.value);
      }}
      onInput={(e: any) => {
        onInput && onInput(e);
        if (!chineseInputting.current) {
          change(e);
        }
      }}
      onCompositionStart={(e: any) => {
        onCompositionStart && onCompositionStart(e);
        chineseInputting.current = true;
      }}
      onCompositionEnd={(e: any) => {
        onCompositionEnd && onCompositionEnd(e);
        if (chineseInputting.current) {
          change(e);
          chineseInputting.current = false;
        }
      }}
    />
  );
};
Input.TextArea = AntInput.TextArea;
Input.Password = InputPassword;
Input.Search = InputSearch;
Input.Group = AntInput.Group;
export default Input;
