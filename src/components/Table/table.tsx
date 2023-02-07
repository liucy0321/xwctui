import React, { FC, useState, useCallback } from "react";
import {
  TableProps,
  Table as AntTable,
  Empty,
  Modal,
  Button,
  Switch,
  Popconfirm,
} from "antd";
import { DndProvider } from "react-dnd";
import { ColumnType } from "antd/lib/table";
import { TableSummary } from "./tableSummary";
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
import { optionsTyps, findFromData, getParam } from "./utils/common";
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
  parentchildsign: any;
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
            // disabled={hideAddIcon}
            style={{ display: hideAddIcon ? "none" : "block" }}
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
  // 拖拽
  const findRow = (id) => {
    const { row, index, parentIndex } = findFromData(
      dataSource,
      id,
      parentChildSign
    );
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
      if (parentChildSign?.length !== 2) {
        return;
      }
      let { dragId, dropId, dropParentId, operateType, originalIndex } = props;
      let {
        dragRow,
        dropRow,
        dragIndex,
        dropIndex,
        dragParentIndex, // 拖拽子节点的父节点索引
        // dropParentIndex, // 放置子节点父节点索引
      } = getParam(dataSource, dragId, dropId, parentChildSign);
      // 拖拽是否是组
      // let dragIsGroup =
      //   dragRow?.type === dataType.group || !dragRow?.[parentChildSign?.[1]];
      let dragIsGroup = !dragRow?.[parentChildSign?.[1]];
      // 放置的是否是组
      let dropIsGroup = !dropParentId;

      // 根据变化的数据查找拖拽行的row和索引
      const {
        row,
        index: rowIndex,
        // parentIndex: rowParentIndex,
      } = findFromData(dataSource, dragId, parentChildSign);
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
    [dataSource, onMoveRow, parentChildSign]
  );
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <AntTable
          bordered
          columns={copyColumns}
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
