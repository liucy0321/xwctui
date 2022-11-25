import React, { FC, useState } from "react";
import {
  TableProps,
  Table as AntTable,
  Empty,
  Modal,
  Button,
  Switch,
  Popconfirm,
} from "antd";
import { ColumnType } from "antd/lib/table";
import { TableSummary } from "./tableSummary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ISummaryConfig } from "./tableSummary";
import {
  PlusOutlined,
  MinusOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
// 选择
export interface ISelectContext {
  onSelect?: (value: string, isSelected?: boolean) => void;
  selectedValues: string[];
  multiple?: boolean;
}
export interface IColumnType<RecordType> extends ColumnType<RecordType> {
  /**是否隐藏该列 */
  hideColumn?: boolean;
  /**是否增加必填title */
  required?: boolean;
  /**数字小数位 */
  toFixedNum?: number;
  /**数字千分位 */
  thousandth?: boolean;
}
export interface IColumnGroupType<RecordType>
  extends Omit<IColumnType<RecordType>, ""> {
  children: ColumnsType<RecordType>;
}
export declare type ColumnsTypeProp<RecordType> =
  | IColumnGroupType<RecordType>
  | IColumnType<RecordType>;
export declare type ColumnsType<RecordType> = ColumnsTypeProp<RecordType>[];
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
  className?: string;
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
// 深拷贝方法
export function clone(data) {
  //2.判断值类型（即不是object类型）
  if (typeof data != "object") {
    return data;
  }
  //3.判断数组
  else if (data.constructor === Array) {
    return data.map((i) => clone(i));
  }
  //4.判断json类型
  else if (data.constructor === Object) {
    let tem = {};
    for (let key in data) {
      tem[key] = clone(data[key]);
    }
    return tem;
  }
  //5.判断系统对象和自定义对象
  else {
    return new data.constructor(data);
  }
}
// 表格列数字千分位
export function thousandth(num) {
  if (!(/^[-\d]\d*$/.test(num) || /^[-\d]\d*\.\d*$/.test(num))) {
    return num;
  }
  let newNum = (num < 0 ? -num : num) + "";
  const reg = new RegExp("\\B(?<!(\\.\\d+))(?=(\\d{3})+\\b)", "g"); // return (num < 0 ? "-" : "") + newNum.replace(/(?=(?!^)(?:\d{3})+(?:\.|$))(\d{3}(\.\d+$)?)/g, ',$1');
  return (num < 0 ? "-" : "") + newNum.replace(reg, ","); // 小数位不进行千分位。
}
export const Table: FC<IProps<any>> = (props) => {
  const {
    children,
    summaryConfig,
    showColumnDynamic,
    columns,
    rowSelection,
    dataSource,
    onAddAndDelHandle,
    hideAddIcon,
    hideDelIcon,
    className,
    ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  // const [dynamicData, setDynamicData] = useState(columns);
  let copyColumns = clone(columns);
  for (let index in copyColumns) {
    const { required, title } = copyColumns[index];
    if (required) {
      copyColumns[index].title = () => {
        return (
          <>
            <span className="red-column-span">*</span>
            <span>{title}</span>
          </>
        );
      };
    }
  }
  // 表格动态列配置
  if (showColumnDynamic && copyColumns) {
    copyColumns[0].title = () => {
      return (
        <Button type="link">
          <MenuFoldOutlined onClick={showDrawer} />
        </Button>
      );
    };
  }
  // 表格列删除
  copyColumns = copyColumns?.filter((pane) => pane?.hideColumn !== true);
  // 表格列数字小数点
  // 表格列数字千分位
  for (let i in copyColumns) {
    if (
      copyColumns[i]?.toFixedNum &&
      copyColumns[i]?.thousandth &&
      !copyColumns[i]?.render
    ) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) => thousandth(text?.toFixed(copyColumns[i]?.toFixedNum)),
      };
    } else if (copyColumns[i]?.toFixedNum && !copyColumns[i]?.render) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) => text?.toFixed(copyColumns[i]?.toFixedNum),
      };
    } else if (copyColumns[i]?.thousandth && !copyColumns[i]?.render) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) => thousandth(text),
      };
    }
  }
  /**
   * 新增删除按钮
   */
  if (onAddAndDelHandle) {
    // 给第一位添加
    copyColumns.unshift({
      width: 50,
      fixed: "left",
      render: (text, record, index) => (
        <div className="add_del_css">
          <PlusOutlined
            disabled={hideAddIcon}
            onClick={() => {
              onAddAndDelHandle("add", index);
            }}
          />
          <Popconfirm
            title="是否确定删除?"
            cancelText="否"
            okText="是"
            onConfirm={() => {
              onAddAndDelHandle("del", index);
            }}
          >
            <MinusOutlined disabled={hideDelIcon} />
          </Popconfirm>
        </div>
      ),
    });
  }
  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const dynamicColumns: ColumnsType<any> = [
    {
      title: "排序",
      width: 50,
      fixed: "left",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "列名称",
      dataIndex: "title",
      key: "title",
      width: 160,
    },
    // {
    //   title: "别名",
    //   dataIndex: "title",
    //   key: "title",
    //   width: 160,
    //   render: () => {
    //     return <Input />;
    //   },
    // },
    {
      title: "是否显示",
      dataIndex: "title",
      key: "title",
      width: 80,
      align: "center",
      render: (value, record, index) => {
        return (
          <Switch
            checkedChildren="显示"
            unCheckedChildren="隐藏"
            defaultChecked
          />
        );
      },
    },
  ];
  const classes = classNames("xwct-table", className);
  // 动态表头配置
  return (
    <>
      <AntTable
        bordered
        columns={copyColumns}
        className={classes}
        scroll={{ x: 1000, y: 500 }}
        pagination={false}
        rowSelection={rowSelection}
        dataSource={dataSource}
        summary={() =>
          summaryConfig ? (
            <AntTable.Summary fixed>
              <TableSummary
                columns={copyColumns}
                summaryConfig={summaryConfig}
                rowSelection={rowSelection}
                dataSource={dataSource}
              />
            </AntTable.Summary>
          ) : null
        }
        locale={{
          emptyText: (
            <Empty
              description="暂无数据"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
          ),
        }}
        {...restProps}
      />
      <Modal
        title="动态表头配置"
        closable={false}
        onCancel={onClose}
        visible={open}
        width={600}
        getContainer={false}
      >
        <DndProvider backend={HTML5Backend}>
          <AntTable
            scroll={{ x: 400, y: 500 }}
            bordered
            columns={dynamicColumns}
            dataSource={columns}
            pagination={false}
          />
        </DndProvider>
      </Modal>
    </>
  );
};

Table.defaultProps = {
  bordered: true,
};
export default Table;
