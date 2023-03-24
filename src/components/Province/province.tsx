import React, { FC, useState, useEffect } from "react";
import { Cascader as AntCascader, CascaderProps } from "antd";
import axios from "axios";
interface Option {
  areaCode: string;
  areaName: string;
  children?: Option[];
  leaf?: boolean;
  loading?: boolean;
}
/**
 * Input 输入框 通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * 默认添加autoComplete="off"和allowClear
 *
 * ~~~js
 * // 这样引用
 * import { Province } from 'xwctui'
 * ~~~
 *
 */
export const Province: FC<CascaderProps<any>> = (props: any) => {
  const [options, setOptions] = useState<Option[]>([]);
  const { ...restProps } = props;
  useEffect(() => {
    axios
      .post("/mapi/oper/area/list", {})
      .then((response) => {
        let copyData = [...response?.data?.data];
        for (let i = 0; i < copyData?.length; i++) {
          if (copyData[i]?.leaf === false) {
            copyData[i] = {
              ...copyData[i],
              isLeaf: false,
            };
          }
        }
        setOptions(copyData);
      })
      .catch((error) => {});
  }, []);
  const loadData = (selectedOptions: Option[]) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    // load options lazily
    setTimeout(() => {
      targetOption.loading = false;
      axios
        .post("/mapi/oper/area/list", {
          parentAreaCode: targetOption?.areaCode,
        })
        .then((response) => {
          let copyData = [...response?.data?.data];
          for (let i = 0; i < copyData?.length; i++) {
            if (copyData[i]?.leaf === false) {
              copyData[i] = {
                ...copyData[i],
                isLeaf: false,
              };
            }
          }
          setOptions(copyData);

          targetOption.children = copyData;
          setOptions([...options]);
        })
        .catch((error) => {});
    }, 1000);
  };
  // 暴露
  return (
    <AntCascader
      {...restProps}
      options={options}
      loadData={loadData}
      fieldNames={{ label: "areaName", value: "areaCode" }}
      changeOnSelect
    />
  );
};
export default Province;
