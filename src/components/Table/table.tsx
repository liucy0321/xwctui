import React, { FC, useState, useCallback, useEffect, useRef } from "react";
import {
  TableProps,
  Table as AntTable,
  Empty,
  Button,
  Popconfirm,
  Tooltip,
  message,
} from "antd";
import { DndProvider } from "react-dnd";
import { ColumnType } from "antd/lib/table";
import { TableSummary } from "./tableSummary";
import { TableColumns } from "./tableColumns";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ISummaryConfig } from "./tableSummary";
import { clone, thousandth } from "./utils/common";
import { DraggableBodyRow } from "./components/row";
// 拖拽
import { useMoveRow } from "./hooks";
import ResizableTable from "./ResizableTable";
import {
  PlusOutlined,
  MinusOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { findFromData, isNull } from "./utils/common";
import axios from "axios";
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
  /**是否层级 */
  ifShowIndent?: boolean;
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
  onAddAndDelHandle?: (
    type: "add" | "del",
    index: number,
    record?: any
  ) => void | null;
  /**隐藏新增icon */
  hideAddIcon?: boolean;
  /**隐藏删除icon */
  hideDelIcon?: boolean;
  /**是否显示动态表头配置 */
  columnsRender?: any;
  /**表格刷新 */
  onReload?: () => void;
  /**表格Code */
  tableCode?: string;
  /**是否显示小计或总计 */
  summaryConfig?: ISummaryConfig[];
  /**小计总计固定 */
  summaryFixed?: boolean;
  /**父id标识 */
  parentChildSign?: string[];
  /**表格列拖拽 */
  ifColumnDrag?: boolean;
  /**表格行拖拽 */
  onMoveRow?: (data: any, dragParentIndex?: any, operateType?: string) => void;
  /**表格列编辑事件 */
  onEditableSave?: (
    record: RecordType,
    index: number | undefined,
    dataIndex: string
  ) => void;
  /**表格动态列配置事件 */
  onDynamicChange?: (dynamicColumns: ColumnsType<RecordType>) => void;
  columns?: ColumnsType<RecordType>;
  dataSource?: any[];
  className?: string;
  /**树形层级level名称 */
  indentTitle?: string;
  /**按钮权限 */
  btnAuth?: any;
  /**序号宽度 */
  orderWidth?: number;
}
export interface DraggableBodyRowProps
  extends React.HTMLAttributes<HTMLTableRowElement> {
  index: number;
  record: any;
  data: any;
  moveRow: (opt: any) => void;
  findRow: any;
  parentchildsign?: any;
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

const components = {
  body: {
    row: DraggableBodyRow,
  },
};
export const Table: FC<IProps<any>> = (props) => {
  const {
    children,
    summaryConfig,
    tableCode,
    columns,
    rowSelection,
    dataSource,
    onAddAndDelHandle,
    hideAddIcon,
    hideDelIcon,
    className,
    indentSize,
    indentTitle,
    parentChildSign,
    onMoveRow,
    rowKey,
    onReload,
    columnsRender,
    ifColumnDrag,
    btnAuth,
    orderWidth,
    ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState([]);
  const oldTableCodeRef = useRef<any>("");
  let currentColumns = useRef<any>([]);
  let copyColumns = clone(columns) || [];
  const nowTimeRef = useRef<any>(true);
  const timerRef = useRef<any>();
  const moveRow = useMoveRow({
    rowKey,
    parentChildSign,
    dataSource,
    onMoveRow,
  });
  /**
   * 所有展示增加省略号
   */
  for (let i = 0; i < copyColumns?.length; i++) {
    if (
      !copyColumns[i]?.ellipsis &&
      copyColumns[i]?.title !== "操作" &&
      copyColumns[i]?.title !== "状态"
    ) {
      copyColumns[i] = {
        ellipsis: true,
        ...copyColumns[i],
      };
    }
  }
  /**
   * 增加必填标识
   */
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
  // 增加第一列
  if (onMoveRow) {
    copyColumns = [
      {
        title: "拖拽排序",
        width: 70,
        key: "sort",
        align: "center",
      },
      ...copyColumns,
    ];
  }
  // 表格列删除
  copyColumns = copyColumns?.filter((pane) => pane?.hideColumn !== true);
  // 表格列数字小数点
  // 表格列数字千分位
  for (let i in copyColumns) {
    const colNum = copyColumns[i]?.toFixedNum;
    if (
      copyColumns[i]?.toFixedNum &&
      copyColumns[i]?.thousandth &&
      !copyColumns[i]?.render
    ) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) =>
          !isNull(text) ? thousandth(parseFloat(text)?.toFixed(colNum)) : "",
      };
    } else if (copyColumns[i]?.toFixedNum && !copyColumns[i]?.render) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) =>
          !isNull(text) ? parseFloat(text)?.toFixed(colNum) : "",
      };
    } else if (copyColumns[i]?.thousandth && !copyColumns[i]?.render) {
      copyColumns[i] = {
        ...copyColumns[i],
        render: (text) => (!isNull(text) ? thousandth(parseFloat(text)) : ""),
      };
    }
  }
  /**
   * 树形根据层级增加缩进
   */
  if (indentTitle) {
    for (let i = 0; i < copyColumns.length; i++) {
      if (copyColumns[i]?.ifShowIndent) {
        copyColumns[i] = {
          ...copyColumns[i],
          render: (text, record, index) => {
            const padding = (indentSize || 15) * (record?.[indentTitle] - 1);
            return <span style={{ paddingLeft: padding + "px" }}>{text}</span>;
          },
        };
      }
    }
  }
  const changeData = useCallback(
    (data) => {
      let copyColumns = clone(columns) || [];
      let copyData: any = [...data];
      setDynamicData(copyData);
      copyData = copyData?.filter((pane) => pane?.ifShow === "Y");
      // 加列设置按钮
      currentColumns.current = [
        {
          title: (
            <Tooltip title="列设置">
              <Button type="link">
                <MenuFoldOutlined onClick={() => setOpen(true)} />
              </Button>
            </Tooltip>
          ),
          width: orderWidth || 50,
          fixed: "left",
          render: (text, record, index) => `${index + 1}`,
        },
      ];
      /**
       * 解析columnsRender
       */
      let copyColumnsRender: any = { ...columnsRender };
      if (copyColumnsRender?.[0]) {
        copyColumnsRender = copyColumnsRender?.[0];
      }
      for (let item in copyColumnsRender) {
        let itemList = item.split(",");
        if (itemList.length > 1) {
          for (let i = 0; i < itemList.length; i++) {
            copyColumnsRender[itemList[i]] = copyColumnsRender[item];
          }
          delete copyColumnsRender[item];
        }
      }
      // 根据动态数据重新构建columns
      for (let i = 0; i < copyData?.length; i++) {
        // 左固定或者右固定
        let ifFixed: any = null;
        if (copyData?.[i]?.ifFixed === "L") {
          ifFixed = "left";
        } else if (copyData?.[i]?.ifFixed === "R") {
          ifFixed = "right";
        }
        const column = {
          title: copyData?.[i]?.columnDesc,
          dataIndex: copyData?.[i]?.columnName,
          key: copyData?.[i]?.columnName,
          ellipsis: true,
          width: copyData?.[i]?.columnWidth,
          fixed: ifFixed,
          thousandth: copyData?.[i]?.thousandth,
          toFixedNum: parseInt(copyData?.[i]?.toFixedNum),
          render: copyColumnsRender?.[copyData?.[i]?.columnName],
        };

        currentColumns.current.push(column);
      }
      // 拼接增加的columns和构建的
      currentColumns.current = currentColumns.current.concat(copyColumns);
      // 表格列数字小数点
      // 表格列数字千分位
      // 表格列删除
      currentColumns.current = currentColumns.current?.filter(
        (pane) => pane?.hideColumn !== true
      );
      for (let i in currentColumns.current) {
        const colNum = currentColumns.current[i]?.toFixedNum;
        if (
          currentColumns.current[i]?.toFixedNum &&
          currentColumns.current[i]?.thousandth &&
          !currentColumns.current[i]?.render
        ) {
          currentColumns.current[i] = {
            ...currentColumns.current[i],
            render: (text) =>
              !isNull(text)
                ? thousandth(parseFloat(text)?.toFixed(colNum))
                : "",
          };
        } else if (
          currentColumns.current[i]?.toFixedNum &&
          !currentColumns.current[i]?.render
        ) {
          currentColumns.current[i] = {
            ...currentColumns.current[i],
            render: (text) =>
              !isNull(text) ? parseFloat(text)?.toFixed(colNum) : "",
          };
        } else if (
          currentColumns.current[i]?.thousandth &&
          !currentColumns.current[i]?.render
        ) {
          currentColumns.current[i] = {
            ...currentColumns.current[i],
            render: (text) =>
              !isNull(text) ? thousandth(parseFloat(text)) : "",
          };
        }
      }
      // 增加&删除按钮
      if (onAddAndDelHandle) {
        currentColumns.current.unshift({
          width: 50,
          fixed: "left",
          render: (text, record, index) => (
            <div className="add_del_css">
              <PlusOutlined
                style={{ display: hideAddIcon ? "none" : "block" }}
                onClick={() => {
                  onAddAndDelHandle && onAddAndDelHandle("add", index, record);
                }}
              />
              <Popconfirm
                title="是否确定删除?"
                cancelText="否"
                okText="是"
                onConfirm={() => {
                  onAddAndDelHandle && onAddAndDelHandle("del", index, record);
                }}
              >
                <MinusOutlined
                  style={{ display: hideDelIcon ? "none" : "block" }}
                />
              </Popconfirm>
            </div>
          ),
        });
      }
    },
    [
      columns,
      columnsRender,
      hideAddIcon,
      hideDelIcon,
      onAddAndDelHandle,
      orderWidth,
    ]
  );
  /**
   * 根据接口获取显示动态列
   */
  const selectColData = useCallback(() => {
    if (oldTableCodeRef.current !== tableCode) {
      axios
        .post("/mapi/oper/tableConfig/query", {
          tableCode,
          fieldAuthList: btnAuth,
        })
        .then((response) => {
          if (response?.data?.isSuccess) {
            oldTableCodeRef.current = tableCode;
            changeData(response?.data?.data);
          } else {
            message.warning(response?.data?.msg || "网络异常，请联系管理员！");
          }
        });
    }
  }, [btnAuth, changeData, tableCode]);
  const debounce = useCallback(
    (wait: number) => {
      clearTimeout(timerRef.current);
      if (nowTimeRef?.current) {
        selectColData();
        nowTimeRef.current = false;
      }
      timerRef.current = setTimeout(() => {
        nowTimeRef.current = true;
      }, wait);
    },
    [selectColData]
  );
  /**
   * 初始化
   */
  useEffect(() => {
    if (tableCode) {
      /**
       * 一秒内不允许调两次接口
       */
      debounce(1000);
    }
  }, [debounce, tableCode]);
  const unshiftAddAndDel = () => {
    // 给第一位添加
    copyColumns.unshift({
      width: 50,
      fixed: "left",
      render: (text, record, index) => (
        <div className="add_del_css">
          <PlusOutlined
            // disabled={hideAddIcon}
            style={{ display: hideAddIcon ? "none" : "block" }}
            onClick={() => {
              onAddAndDelHandle && onAddAndDelHandle("add", index, record);
            }}
          />
          <Popconfirm
            title="是否确定删除?"
            cancelText="否"
            okText="是"
            onConfirm={() => {
              onAddAndDelHandle && onAddAndDelHandle("del", index, record);
            }}
          >
            <MinusOutlined
              style={{ display: hideDelIcon ? "none" : "block" }}
            />
          </Popconfirm>
        </div>
      ),
    });
  };
  /**
   * 新增删除按钮
   */
  if (onAddAndDelHandle && copyColumns && !tableCode) {
    unshiftAddAndDel();
  }
  const classes = classNames("xwct-table", className);
  // 拖拽
  const findRow = (id) => {
    const { row, index, parentIndex } = findFromData(dataSource, id, rowKey);
    return {
      row,
      rowIndex: index,
      rowParentIndex: parentIndex,
    };
  };
  const onReloadById = () => {
    oldTableCodeRef.current = "";
    selectColData();
    onReload && onReload();
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        {ifColumnDrag === false ? (
          <AntTable
            bordered
            columns={tableCode ? currentColumns?.current : copyColumns}
            rowKey={rowKey}
            components={onMoveRow ? components : undefined}
            className={classes}
            scroll={{ x: 1000, y: "calc(100vh )" }}
            style={{ height: "calc(100% - 115px)" }}
            pagination={false}
            rowSelection={rowSelection}
            dataSource={dataSource}
            indentSize={indentSize}
            summary={() =>
              summaryConfig ? (
                <AntTable.Summary fixed>
                  <TableSummary
                    columns={tableCode ? currentColumns?.current : copyColumns}
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
            onRow={
              onMoveRow
                ? (record, index) => {
                    const attr = {
                      index,
                      record,
                      data: dataSource,
                      parentchildsign: parentChildSign,
                      moveRow: moveRow,
                      findRow: findRow,
                      children: tableCode
                        ? currentColumns?.current
                        : copyColumns,
                    };
                    return attr as DraggableBodyRowProps;
                  }
                : undefined
            }
            {...restProps}
          />
        ) : (
          <ResizableTable
            bordered
            columns={tableCode ? currentColumns?.current : copyColumns}
            rowKey={rowKey}
            components={onMoveRow ? components : undefined}
            className={classes}
            scroll={{ x: 1000, y: "calc(100vh )" }}
            style={{ height: "calc(100% - 115px)" }}
            pagination={false}
            rowSelection={rowSelection}
            dataSource={dataSource}
            indentSize={indentSize}
            summary={() =>
              summaryConfig ? (
                <AntTable.Summary fixed>
                  <TableSummary
                    columns={tableCode ? currentColumns?.current : copyColumns}
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
            onRow={
              onMoveRow
                ? (record, index) => {
                    const attr = {
                      index,
                      record,
                      data: dataSource,
                      parentchildsign: parentChildSign,
                      moveRow: moveRow,
                      findRow: findRow,
                      children: tableCode
                        ? currentColumns?.current
                        : copyColumns,
                    };
                    return attr as DraggableBodyRowProps;
                  }
                : undefined
            }
            {...restProps}
          />
        )}
      </DndProvider>
      <TableColumns
        open={open}
        onClose={() => setOpen(false)}
        dynamicData={dynamicData}
        setDynamicData={setDynamicData}
        tableCode={tableCode}
        onReload={onReloadById}
      />
    </>
  );
};

Table.defaultProps = {
  bordered: true,
};
export default Table;
