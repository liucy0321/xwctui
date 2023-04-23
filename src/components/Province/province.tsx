import React, { FC, useState, useRef, useEffect } from "react";
import { Cascader as AntCascader, CascaderProps, message } from "antd";
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
interface IProvince {
  visible?: boolean;
}
export const Province: FC<IProvince & CascaderProps<any>> = (props: any) => {
  const { value, visible, ...restProps } = props;
  const [options, setOptions] = useState<Option[]>([]);
  const [provinceVal, setProvinceVal] = useState<any>([]);
  const optionsRef = useRef<any>([]);
  // 省市区快捷录入
  const getCodeByArea = () => {
    axios
      .post("/mapi/zserp/crm/housingEstate/getDefaultArea", {})
      .then((res: any) => {
        if (res?.data?.isSuccess) {
          const { province, city, area } = res?.data?.data;
          let list: any = [];
          if (province) {
            list.push(province);
            getLoadOptions(province);
          }
          if (province && city) {
            list.push(city);
            getLoadOptions(province, city);
          }
          if (province && city && area) {
            area && list.push(area);
          }
          setProvinceVal(list);
        } else {
          message.error(res?.msg || "网络异常，请联系管理员！");
        }
      });
  };
  useEffect(() => {
    if (visible === false) {
      return;
    }
    axios.post("/mapi/oper/area/list", {}).then((res: any) => {
      if (res?.data?.isSuccess) {
        let copyData = [...res?.data?.data];
        copyData = copyData.map((item) => {
          if (item?.leaf === false) item.isLeaf = false;
          return item;
        });
        setOptions(copyData);
        optionsRef.current = copyData;
        if (value?.length > 0) {
          value.length > 0 && getLoadOptions(value[0]);
          (value.length === 2 || value.length === 3) &&
            getLoadOptions(value[0], value[1]);
        } else {
          getCodeByArea();
        }
      } else {
        message.error(res?.msg || "网络异常，请联系管理员！");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, visible]);
  /**
   * 获取省市区下的
   *
   */
  const getLoadOptions = (province, city?: string) => {
    axios
      .post("/mapi/oper/area/list", { parentAreaCode: city || province })
      .then((res: any) => {
        if (res?.data?.isSuccess) {
          let copyData = [...res?.data?.data];
          let copyOptions: any = [...optionsRef.current];
          copyOptions = copyOptions.map((item) => {
            if (item?.leaf === false) item.isLeaf = false;
            return item;
          });
          if (!city) {
            // 获取省的下级
            copyOptions = copyOptions.map((item) => {
              if (item.areaCode === province) item.children = copyData;
              return item;
            });
          } else {
            // 获取市的下级
            copyOptions = copyOptions.map((item) => {
              if (item.areaCode === province) {
                item.children?.map((cityItem) => {
                  if (cityItem.areaCode === city) {
                    cityItem.children = copyData;
                  }
                  return cityItem;
                });
              }
              return item;
            });
          }
          setOptions(copyOptions);
          optionsRef.current = copyOptions;
        } else {
          message.error(res?.msg || "网络异常，请联系管理员！");
        }
      });
  };
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
          copyData = copyData.map((item) => {
            if (item?.leaf === false) item.isLeaf = false;
            return item;
          });
          setOptions(copyData);
          targetOption.children = copyData;
          setOptions([...options]);
        })
        .catch((error) => {});
    }, 1000);
  };
  // 暴露
  return (
    <>
      {provinceVal.length > 0 && (
        <AntCascader
          options={options}
          loadData={loadData}
          fieldNames={{ label: "areaName", value: "areaCode" }}
          changeOnSelect
          defaultValue={provinceVal}
          value={value}
          {...restProps}
        />
      )}
    </>
  );
};
export default Province;
