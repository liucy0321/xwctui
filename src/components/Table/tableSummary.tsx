import React, { FC } from "react";
import { Table as AntTable } from "antd";
import { ColumnsType } from "antd/lib/table";
// 选择
export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

interface IFields {
  toFixedNum: number;
  key: string;
  value?: string | number;
  fn?: (num: string | number) => any;
}
// 小计或总计
export interface ISummaryConfig {
  type: "average" | "total";
  fields: IFields[];
  title?: string;
  onClickHandle?: any;
  [prop: string]: any;
}
export interface ISumTableProps {
  summaryConfig?: ISummaryConfig[];
  columns: ColumnsType<any> | undefined;
}
export const TableSummary: FC<ISumTableProps> = (sumProps) => {
  const { summaryConfig, columns } = sumProps;
  return (
    <>
      {/* <AntTable.Summary fixed> */}
      {summaryConfig?.map((sumItem, sumIndex) => {
        return (
          <AntTable.Summary.Row key={sumIndex}>
            {columns?.map((colItem, index) => {
              const itemIndex = sumItem.fields.findIndex(
                (item) => item.key === colItem?.key
              );
              if (itemIndex >= 0) {
                return (
                  <AntTable.Summary.Cell index={index} key={index + "a"}>
                    {sumItem.fields[itemIndex]?.value}
                  </AntTable.Summary.Cell>
                );
              } else {
                return (
                  <AntTable.Summary.Cell index={index} key={index + "a"}>
                    <strong>
                      {index === 0
                        ? sumItem?.type === "total"
                          ? "合计"
                          : "平均数"
                        : null}
                    </strong>
                  </AntTable.Summary.Cell>
                );
              }
            })}
          </AntTable.Summary.Row>
        );
      })}
      {/* </AntTable.Summary> */}
    </>
  );
};

export default TableSummary;
