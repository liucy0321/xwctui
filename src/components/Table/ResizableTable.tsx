import { Table as AntTable } from "antd";
import { ColumnsType } from "antd/lib/table";
import { IProps } from "./table";
import React, { useEffect, useState } from "react";
import { Resizable } from "react-resizable";
/**
 * 拖拽表头
 * @param props
 * @returns
 */
const ResizableTitle = (props: any) => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }
  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className="react-resizable-handle"
          onClick={(e) => {
            e.stopPropagation();
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  );
};
/**
 * 可伸缩列
 * @param props
 * @returns
 */
const ResizableTable = (props: IProps<any>) => {
  const { ...restProps } = props;
  const [column, setcolumn] = useState<ColumnsType<any>>([]);
  useEffect(() => {
    if (props.columns) {
      setcolumn(props.columns);
    }
  }, [props.columns]);
  // 给每一列加onResize 用于拖拽
  const setNewColumnCell = (column: any[], indexarray: number[]) => {
    // eslint-disable-next-line array-callback-return
    column.map((col, index) => {
      let array2 = JSON.parse(JSON.stringify(indexarray));
      array2.push(index);
      col.onHeaderCell = (column: { width: any }) => ({
        width: column.width ?? 0,
        onResize: handleResize(index, array2),
        onmouseup: handleResize(index, array2),
      });

      if (col.children?.length) {
        setNewColumnCell(col.children, array2);
      }
    });
  };
  const handleResize =
    (index: number, indexarray: number[]) => (e: any, a: { size: any }) => {
      const { size } = a;
      let nextColumns = JSON.parse(JSON.stringify(column));
      const width = size?.width ?? 100;
      setNewColumnWidth(nextColumns, indexarray, width, []);
      setcolumn(nextColumns);
    };
  const setNewColumnWidth = (
    column: any[],
    indexarray: number[],
    width: number,
    nowIndex: number[]
  ) => {
    let i = 0;
    for (let col of column) {
      const index = i;
      i++;
      const currentLevel = indexarray?.[nowIndex.length];
      if (currentLevel === index) {
        let array2 = JSON.parse(JSON.stringify(nowIndex));
        array2.push(index);
        if (JSON.stringify(array2) === JSON.stringify(indexarray)) {
          col.width = width;
          break;
        }
        console.log(width);
        if (col.children?.length) {
          setNewColumnWidth(col.children, indexarray, width, array2);
        }
      }
    }
  };

  const newcolumn = JSON.parse(JSON.stringify(column));
  setNewColumnCell(newcolumn, []);
  return (
    <AntTable
      {...restProps}
      columns={newcolumn}
      components={{
        header: {
          cell: ResizableTitle,
        },
      }}
    />
  );
};
export default ResizableTable;
