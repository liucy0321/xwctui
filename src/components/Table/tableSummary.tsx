import React, { FC, useState, useCallback, useEffect } from "react";
import { Table as AntTable } from "antd";
import { ColumnsType } from "antd/lib/table";
import { clone, thousandth } from "./utils/common";
// 选择
export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}

export interface IFields {
  toFixedNum?: number;
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
  rowSelection: any;
  dataSource: any;
}
export const TableSummary: FC<ISumTableProps> = (sumProps) => {
  const [summary, setSummary] = useState<any[]>([]);
  const { summaryConfig, columns, rowSelection, dataSource } = sumProps;
  const [currentColumns, setCurrentColumns] = useState<any[]>([]);
  useEffect(() => {
    if (columns && columns.length > 0) {
      let copyColumns: any[] = JSON.parse(JSON.stringify(columns));
      if (rowSelection) {
        let copyArr: any[] = [{}];
        copyColumns = copyArr.concat(copyColumns);
      }
      setCurrentColumns(copyColumns);
    }
  }, [columns, rowSelection]);

  /**
   * 数表格冒泡合计
   */
  const treeSummaryNode = useCallback((data: any[], strArray) => {
    for (var i = 0; i < data?.length; i++) {
      for (let item in strArray) {
        if (data?.[i]?.[item]) {
          strArray[item] += parseFloat(data[i][item]);
        }
      }
      if (
        data?.[i]?.children instanceof Array &&
        data?.[i]?.children.length > 0
      ) {
        // 如果当前child为数组并且长度大于0，才可进入flag()方法
        treeSummaryNode(data[i].children, strArray);
      }
    }
  }, []);
  /**
   * 监听表格改变合计数据
   */
  useEffect(() => {
    let copySummary = clone(summaryConfig);
    let strArray = {};
    let index = copySummary.findIndex((item) => item.type === "total");

    // 自动计算合计
    for (let item in copySummary[index]?.fields) {
      let sumFields = copySummary[index]?.fields;
      if (!sumFields[item]?.value) {
        copySummary[index].fields[item].value = 0;
        strArray[sumFields[item].key] = 0;
      }
    }
    treeSummaryNode(dataSource, strArray);
    for (let item in copySummary[index]?.fields) {
      for (let str in strArray) {
        if (copySummary[index].fields[item].key === str) {
          copySummary[index].fields[item].value = strArray[str];
        }
      }
    }
    setSummary(copySummary);
  }, [dataSource, treeSummaryNode, summaryConfig]);
  return (
    <>
      {/* <AntTable.Summary fixed> */}
      {summary?.map((sumItem, sumIndex) => {
        return (
          <AntTable.Summary.Row key={sumIndex}>
            {currentColumns?.map((colItem, index) => {
              const itemIndex = sumItem.fields.findIndex(
                (item) => item.key === colItem?.key
              );
              if (itemIndex >= 0) {
                let sumValue = sumItem.fields[itemIndex]?.value;
                // 小数
                if (
                  sumItem.fields[itemIndex]?.toFixedNum &&
                  typeof sumValue === "number"
                ) {
                  const fixNum = sumItem.fields[itemIndex]?.toFixedNum;
                  sumValue = thousandth(sumValue.toFixed(fixNum));
                }
                return (
                  <AntTable.Summary.Cell index={index} key={index + "a"}>
                    {sumValue}
                  </AntTable.Summary.Cell>
                );
              } else {
                return (
                  <AntTable.Summary.Cell index={index} key={index + "b"}>
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
