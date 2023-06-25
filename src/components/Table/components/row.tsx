import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes, optionsTyps } from "../utils/common";
import type { DraggableBodyRowProps } from "../table";
import { MenuOutlined } from "@ant-design/icons";
export const DraggableBodyRow = (props: DraggableBodyRowProps) => {
  let {
    record,
    data,
    index,
    className,
    style,
    moveRow,
    findRow,
    parentchildsign,
    children,
    ...restProps
  } = props;
  let id = parentchildsign?.[0];
  let parentId = parentchildsign?.[1];
  var originalRow, originalIndex, originalParentIndex;
  if (findRow) {
    let {
      row: originalRow1,
      rowIndex: originalIndex1,
      rowParentIndex: originalParentIndex1,
    } = findRow(record?.[id]);
    originalRow = originalRow1;
    originalIndex = originalIndex1;
    originalParentIndex = originalParentIndex1;
  }
  let itemObj = {
    id: record?.[id],
    parentId: record?.[parentId],
    index,
    isGroup: !record?.[parentchildsign?.[1]],
    originalRow, // 拖拽原始数据
    originalIndex, // 拖拽原始数据索引
    originalParentIndex, // 拖拽原始数据父节点索引
  };
  let isDrag = true;

  const ref = useRef<any>();

  const [{ handlerId, isOver, dropClassName }, drop] = useDrop({
    accept: ItemTypes,
    collect: (monitor: any) => {
      const {
        id: dragId,
        parentId: dragParentId,
        // index: dragPreIndex,
        isGroup,
      } = monitor.getItem() || {};

      if (dragId === record?.[id]) {
        return {};
      }

      // 是否可以拖拽替换
      let isOver = monitor.isOver();
      if (isGroup) {
        // 要覆盖的数据是分组，或者是最外层的子项可以替换，其他情况不可以
        let recordIsGroup = record?.[parentchildsign?.[1]];
        if (!recordIsGroup) {
          isOver = false;
        }
      } else {
        // 要覆盖的数据是子项，但不在同分组不可以替换
        if (dragParentId !== record?.[parentId]) {
          isOver = false;
        }
      }
      return {
        isOver,
        dropClassName: "drop-over-downward",
        handlerId: monitor.getHandlerId(),
      };
    },
    hover: (item: any, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const dropIndex = index;
      // Don't replace items with themselves
      if (dragIndex === dropIndex) {
        return;
      }

      let opt = {
        dragId: item.id, // 拖拽id
        dropId: record?.[id], // 要放置位置行的id
        dropParentId: record?.[parentId],
        operateType: optionsTyps.hover, // hover操作
      };

      // console.log("hover", opt);
      moveRow(opt);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = dropIndex;
    },
    drop: (item: any) => {
      let opt = {
        dragId: item?.id, // 拖拽id
        dropId: record?.[id], // 要放置位置行的id
        dropParentId: record?.[parentId],
        operateType: optionsTyps.drop,
      };
      moveRow(opt);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes,
    item: itemObj,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    // canDrag: (props, monitor) => isDrag //parentId不为0的才可以拖拽
    end: (item, monitor) => {
      const { id: droppedId, originalRow } = item;
      const didDrop = monitor.didDrop();
      // 超出可拖拽区域，需要将拖拽行还原
      if (!didDrop) {
        let opt = {
          dragId: droppedId, // 拖拽id
          dropId: originalRow?.[id], // 要放置位置行的id
          dropParentId: originalRow?.[parentId],
          originalIndex,
          originalParentIndex,
          operateType: optionsTyps.didDrop,
        };
        // console.log("useDrag:", opt);
        moveRow(opt);
      }
    },
  });

  drop(drag(ref));
  // 拖拽行的位置显示透明
  const opacity = isDragging ? 0 : 1;

  if (!record) return null;
  return (
    // <tr
    //   ref={ref}
    //   className={`${className}
    //   ${isOver ? dropClassName : ""}
    //   ${isDrag ? "can-drag" : ""}`}
    //   style={isDrag ? { cursor: "move", opacity, ...style } : { ...style }}
    //   data-handler-id={handlerId}
    //   {...restProps}
    // />
    <tr>
      {React.Children.map(children, (child) => {
        if ((child as React.ReactElement)?.key === "sort") {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <MenuOutlined
                ref={ref}
                // style={{ touchAction: "none", cursor: "move" }}
                className={`${className}
    ${isOver ? dropClassName : ""}
    ${isDrag ? "can-drag" : ""}`}
                style={
                  isDrag ? { cursor: "move", opacity, ...style } : { ...style }
                }
                data-handler-id={handlerId}
                {...restProps}
              />
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
