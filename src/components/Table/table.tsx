import React, { FC, useState, useCallback, useEffect, useRef } from "react";
import {
  TableProps,
  Table as AntTable,
  Empty,
  Button,
  Popconfirm,
  Tooltip,
} from "antd";
import { DndProvider } from "react-dnd";
import { ColumnType } from "antd/lib/table";
import { TableSummary } from "./tableSummary";
import { TableColumns } from "./tableColumns";
import { HTML5Backend } from "react-dnd-html5-backend";
import type { ISummaryConfig } from "./tableSummary";
import { clone, thousandth } from "./utils/common";
import { DraggableBodyRow } from "./components/row";
import update from "immutability-helper";
import {
  PlusOutlined,
  MinusOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import { optionsTyps, findFromData, isNull, getParam } from "./utils/common";
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
  showColumnDynamic?: boolean;
  /**跳转方法汇总 */
  thisFunByCol?: (code?: string, record?: any) => void;
  /**表格刷新 */
  onReload?: () => void;
  /**表格Code */
  tableCode?: string;
  /**是否显示小计或总计 */
  summaryConfig?: ISummaryConfig[];
  summaryFixed?: boolean;
  /**父id标识 */
  parentChildSign?: string[];
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
    showColumnDynamic,
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
    thisFunByCol,
    ...restProps
  } = props;
  const [open, setOpen] = useState(false);
  const [dynamicData, setDynamicData] = useState([]);
  let currentColumns = useRef<any>([]);
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
   * 新增删除按钮
   */
  if (onAddAndDelHandle && copyColumns) {
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
              onAddAndDelHandle("add", index, record);
            }}
          />
          <Popconfirm
            title="是否确定删除?"
            cancelText="否"
            okText="是"
            onConfirm={() => {
              onAddAndDelHandle("del", index, record);
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
  const showDrawer = () => {
    setOpen(true);
    selectColData();
  };

  const onClose = () => {
    setOpen(false);
  };
  /**
   * 初始化
   */
  useEffect(() => {
    if (showColumnDynamic && tableCode) {
      selectColData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showColumnDynamic, tableCode]);
  /**
   * 根据接口获取显示动态列
   */
  const selectColData = () => {
    axios
      .post("/mapi/oper/tableConfig/query", { tableCode })
      .then((response) => {
        if (response?.data?.isSuccess) {
          let copyData: any = [...response?.data?.data];
          setDynamicData(copyData);
          copyData = copyData?.filter((pane) => pane?.ifShow === "Y");
          currentColumns.current = [
            {
              title: (
                <Tooltip title="列设置">
                  <Button type="link">
                    <MenuFoldOutlined onClick={showDrawer} />
                  </Button>
                </Tooltip>
              ),
              width: 50,
              fixed: "left",
              render: (text, record, index) => `${index + 1}`,
            },
          ];

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
              render: (text, record, index) => {
                if (copyData?.[i]?.jumpLink) {
                  return (
                    text && (
                      <Button
                        type="link"
                        style={{ padding: 0 }}
                        onClick={() => thisFunByCol?.(tableCode, record)}
                      >
                        {text}
                      </Button>
                    )
                  );
                } else {
                  return text;
                }
              },
            };

            currentColumns.current.push(column);
          }
          currentColumns.current = currentColumns.current.concat(copyColumns);
          // 表格动态列配置
          // currentColumns.current[0].title = () => {
          //   return (
          //     <Button type="link">
          //       <MenuFoldOutlined onClick={showDrawer} />
          //     </Button>
          //   );
          // };
        }
        // else {
        //   message.warning(response?.data?.msg);
        // }
      })
      .catch((error) => {});
  };
  // // 表格动态列配置
  // copyColumns[0].title = () => {
  //   return (
  //     <Tooltip title="列设置">
  //       <Button type="link">
  //         <MenuFoldOutlined onClick={showDrawer} />
  //       </Button>
  //     </Tooltip>
  //   );
  // };
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
  /**
   * 表格拖拽
   * @param props
   * @returns
   */
  const moveRow = useCallback(
    (props) => {
      let childSign = rowKey;
      if (parentChildSign?.length === 2) {
        childSign = parentChildSign?.[0];
      }
      let { dragId, dropId, dropParentId, operateType, originalIndex } = props;
      let {
        dragRow,
        dropRow,
        dragIndex,
        dropIndex,
        dragParentIndex, // 拖拽子节点的父节点索引
        // dropParentIndex, // 放置子节点父节点索引
      } = getParam(dataSource, dragId, dropId, childSign);
      // 拖拽是否是组
      // let dragIsGroup =
      //   dragRow?.type === dataType.group || !dragRow?.[parentChildSign?.[1]];
      let dragIsGroup = true;
      // 放置的是否是组
      let dropIsGroup = !dropParentId;
      if (parentChildSign) {
        dragIsGroup = !dragRow?.[parentChildSign?.[1]];
      }

      // 根据变化的数据查找拖拽行的row和索引
      const {
        row,
        index: rowIndex,
        // parentIndex: rowParentIndex,
      } = findFromData(dataSource, dragId, childSign);
      let newData = dataSource;
      // 组拖拽
      if (dragIsGroup && dropIsGroup) {
        // 超出出拖拽区域还原
        if (operateType === optionsTyps.didDrop) {
          newData = update(dataSource, {
            $splice: [
              [rowIndex, 1], //删除目前拖拽的索引的数据
              [originalIndex, 0, row], // 将拖拽数据插入原始索引位置
            ],
          });
        } else {
          newData = update(dataSource, {
            $splice: [
              [dragIndex, 1],
              [dropIndex, 0, dragRow],
            ],
          });
        }
      }
      // 同一组下的子项拖拽
      else if (
        parentChildSign &&
        dragRow?.[parentChildSign?.[1]] === dropRow?.[parentChildSign?.[1]]
      ) {
        let resultIndex: any = [...dragParentIndex];
        if (resultIndex.length > 0) {
          resultIndex.splice(resultIndex.length - 1, 1);
        }
        // 超出拖拽区域还原
        if (operateType === optionsTyps.didDrop) {
          switch (resultIndex?.length) {
            case 1: {
              // 二级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    $splice: [
                      [rowIndex, 1],
                      [originalIndex, 0, row],
                    ],
                  },
                },
              });
              break;
            }
            case 2: {
              // 三级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    [resultIndex?.[1]]: {
                      children: {
                        $splice: [
                          [rowIndex, 1],
                          [originalIndex, 0, row],
                        ],
                      },
                    },
                  },
                },
              });
              break;
            }
            case 3: {
              // 四级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    [resultIndex?.[1]]: {
                      children: {
                        [resultIndex?.[2]]: {
                          children: {
                            $splice: [
                              [rowIndex, 1],
                              [originalIndex, 0, row],
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              });
            }
          }
        } else {
          switch (resultIndex?.length) {
            case 1: {
              // 二级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    $splice: [
                      [dragIndex, 1],
                      [dropIndex, 0, dragRow],
                    ],
                  },
                },
              });
              break;
            }
            case 2: {
              // 三级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    [resultIndex?.[1]]: {
                      children: {
                        $splice: [
                          [dragIndex, 1],
                          [dropIndex, 0, dragRow],
                        ],
                      },
                    },
                  },
                },
              });
              break;
            }
            case 3: {
              // 四级数组
              newData = update(dataSource, {
                [resultIndex?.[0]]: {
                  children: {
                    [resultIndex?.[1]]: {
                      children: {
                        [resultIndex?.[2]]: {
                          children: {
                            $splice: [
                              [dragIndex, 1],
                              [dropIndex, 0, dragRow],
                            ],
                          },
                        },
                      },
                    },
                  },
                },
              });
            }
          }
        }
      }
      if (onMoveRow) {
        onMoveRow(newData, dragParentIndex, operateType);
      }
    },
    [dataSource, onMoveRow, parentChildSign, rowKey]
  );
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <AntTable
          bordered
          columns={showColumnDynamic ? currentColumns?.current : copyColumns}
          rowKey={rowKey}
          // columns={copyColumns}
          components={onMoveRow ? components : undefined}
          className={classes}
          scroll={{ x: 1000, y: 500 }}
          pagination={false}
          rowSelection={rowSelection}
          dataSource={dataSource}
          indentSize={indentSize}
          summary={() =>
            summaryConfig ? (
              <AntTable.Summary fixed>
                <TableSummary
                  columns={
                    showColumnDynamic ? currentColumns?.current : copyColumns
                  }
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
                  };
                  return attr as DraggableBodyRowProps;
                }
              : undefined
          }
          {...restProps}
        />
      </DndProvider>
      <TableColumns
        open={open}
        onClose={onClose}
        dynamicData={dynamicData}
        setDynamicData={setDynamicData}
        tableCode={tableCode}
        onReload={onReload}
        selectColData={selectColData}
      />
    </>
  );
};

Table.defaultProps = {
  bordered: true,
};
export default Table;
