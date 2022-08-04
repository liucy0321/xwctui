import Table from "./table";
import { Table as AntTable } from "antd";
export declare type ITableComponent = typeof Table & {
  SELECTION_ALL: typeof AntTable.SELECTION_ALL;
  SELECTION_INVERT: typeof AntTable.SELECTION_INVERT;
  SELECTION_NONE: typeof AntTable.SELECTION_NONE;
  Column: typeof AntTable.Column;
  ColumnGroup: typeof AntTable.ColumnGroup;
  Summary: typeof AntTable.Summary;
  DiffClassName: string;
};
declare const TransTable: ITableComponent;
export default Table;
