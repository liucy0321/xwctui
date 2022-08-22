import React from "react";
import { ComponentMeta } from "@storybook/react";
import Table from "./index";
import { ColumnsType } from "antd/lib/table";

export default {
  title: "Table表格",
  component: Table,
  id: "Table",
  decorators: [
    (Story) => (
      <div style={{ width: "100%" }}>
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof Table>;
let columns: ColumnsType<any> = [
  {
    title: "序号",
    width: 62,
    fixed: "left",
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "单据日期",
    dataIndex: "code",
    key: "code",
    width: 160,
  },
  {
    title: "数量",
    dataIndex: "num",
    key: "num",
    width: 220,
  },
  {
    title: "单据编号",
    dataIndex: "name",
    key: "name",
    width: 220,
  },
  {
    title: "客户",
    dataIndex: "ownerName",
    key: "ownerName",
    width: 120,
  },
  {
    title: "客户类别",
    dataIndex: "area",
    key: "area",
    width: 220,
  },
  {
    title: "项目地址",
    dataIndex: "empNumber",
    key: "empNumber",
    width: 120,
  },
  {
    title: "流程类型",
    width: 120,
    dataIndex: "flowTypeStr",
    key: "flowTypeStr",
    ellipsis: true,
  },
  {
    title: "决策值",
    width: 100,
    dataIndex: "model",
    key: "model",
  },
  {
    title: "当前流程节点名称",
    width: 150,
    dataIndex: "nowNodeName",
    key: "nowNodeName",
  },
  {
    title: "下一流程节点名称",
    width: 150,
    dataIndex: "nextNodeName",
    key: "nextNodeName",
  },
  {
    title: "当前节点驳回名称",
    width: 150,
    dataIndex: "rejectToNodeName",
    key: "rejectToNodeName",
  },
  {
    title: "备注",
    width: 220,
    dataIndex: "remarks",
    key: "remarks",
    ellipsis: true,
  },
  {
    title: "创建日期",
    width: 150,
    dataIndex: "createTime",
    key: "createTime",
    ellipsis: true,
  },
  {
    title: "创建人",
    width: 150,
    dataIndex: "createUserName",
    key: "createUserName",
    ellipsis: true,
  },
  {
    title: "更新日期",
    width: 150,
    dataIndex: "updateTime",
    key: "updateTime",
    ellipsis: true,
  },
  {
    title: "更新人",
    width: 150,
    dataIndex: "updateUserName",
    key: "updateUserName",
    ellipsis: true,
  },
];
export const ADefaultTable = (args) => (
  <Table
    columns={columns}
    dataSource={[
      { code: "1212", name: "gaeer", num: "2" },
      { code: "3232", name: "玛丽", num: "2" },
      { code: "3421", name: "玛丽", num: "2" },
      { code: "4324", name: "玛丽", num: "2" },
      { code: "5454", name: "玛丽", num: "2" },
      { code: "6546", name: "玛丽", num: "2" },
    ]}
    rowKey="code"
    summaryConfig={[
      {
        type: "total",
        fields: [
          {
            key: "num",
            value: 12,
            toFixedNum: 0,
          },
          {
            key: "code",
            value: 1212,
            toFixedNum: 0,
          },
          {
            key: "code",
            value: 1212,
            toFixedNum: 0,
          },
        ],
      },
    ]}
  />
);
ADefaultTable.storyName = "基础表格";
