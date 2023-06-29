/**
 * @desc
 *       表格拖拽
 */
import { useCallback } from "react";
import { optionsTyps, findFromData, getParam } from "../utils/common";
import update from "immutability-helper";

const useMoveRow = ({ rowKey, parentChildSign, dataSource, onMoveRow }) => {
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
      onMoveRow && onMoveRow(newData, dragParentIndex, operateType);
    },
    [dataSource, onMoveRow, parentChildSign, rowKey]
  );

  return moveRow;
};

export default useMoveRow;
