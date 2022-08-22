import React, { FC } from "react";
import { TableProps, Table as AntTable, Empty } from "antd";
import { ColumnsType } from "antd/lib/table";
import { TableSummary } from "./tableSummary";
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
export interface IProps<RecordType>
  extends Omit<TableProps<RecordType>, "columns"> {
  /**新增行删除行方法 */
  onAddAndDelHandle?: (type: "add" | "del", index: number) => void;
  /**隐藏新增icon */
  hideAddIcon?: boolean;
  /**隐藏删除icon */
  hideDelIcon?: boolean;
  /**是否显示动态表头配置 */
  showColumnDynamic?: boolean;
  /**是否显示小计或总计 */
  summaryConfig?: ISummaryConfig[];
  summaryFixed?: boolean;
  /**表格行拖拽 */
  onMoveRow?: (dragIndex: number, hoverIndex: number) => void;
  /**表格列编辑事件 */
  onEditableSave?: (
    record: RecordType,
    index: number | undefined,
    dataIndex: string
  ) => void;
  /**表格动态列配置事件 */
  onDynamicChange?: (dynamicColumns: ColumnsType<RecordType>) => void;
  /**初始化值 */
  initColumns?: ColumnsType<RecordType>;
  columns?: ColumnsType<RecordType>;
  dataSource?: any[];
}
/**
 * TodoList
 * 实现列拖拽切换位置、显隐功能 completed
 * 实现新增行、删除行功能 completed
 * 实现全选、单选功能 completed
 * 实现必填标记 completed
 * 实现平均数 总计功能 completed
 * 实现可拖拽行 completed
 * 实现可编辑功能
 */
export const Table: FC<IProps<any>> = (props) => {
  const { children, summaryConfig, columns, ...restProps } = props;
  let className = "xwct-table";
  // 动态表头配置
  return (
    <AntTable
      bordered
      columns={columns}
      className={className}
      scroll={{ x: 1000, y: 500 }}
      pagination={false}
      summary={() => (
        <AntTable.Summary fixed>
          <TableSummary columns={columns} summaryConfig={summaryConfig} />
        </AntTable.Summary>
      )}
      locale={{
        emptyText: (
          <Empty description="暂无数据" image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ),
      }}
      {...restProps}
    />
  );
};

Table.defaultProps = {
  bordered: true,
};
export default Table;
