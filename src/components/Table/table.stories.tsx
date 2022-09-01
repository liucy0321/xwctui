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
    // title: "序号",
    width: 100,
    fixed: "left",
    // render: (text, record, index) => `${index + 1}`,
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
const tableData = [
  {
    id: "e994a444-ada9-4cf5-96b2-47afc594ed92",
    menuName: "系统设置",
    upMenuId: null,
    menuUrl: null,
    menuIcon: null,
    menuType: "menu",
    buttonNo: null,
    sortNo: 1,
    appId: "erp",
    remark: "系统设置备注",
    children: null,
  },
  {
    id: "1",
    menuName: "一级菜单",
    upMenuId: null,
    menuUrl: null,
    menuIcon: null,
    menuType: "menu",
    buttonNo: null,
    sortNo: 2,
    appId: "erp",
    remark: "test",
    children: [
      {
        id: "2",
        menuName: "二级菜单1",
        upMenuId: "1",
        menuUrl: null,
        menuIcon: null,
        menuType: "menu",
        buttonNo: null,
        sortNo: 3,
        appId: "erp",
        remark: "test子菜单",
        children: [
          {
            id: "4",
            menuName: "三级菜单11",
            upMenuId: "2",
            menuUrl: null,
            menuIcon: null,
            menuType: "menu",
            buttonNo: null,
            sortNo: 5,
            appId: "erp",
            remark: "test孙子菜单",
            children: [
              {
                id: "8",
                menuName: "查询按钮11",
                upMenuId: "4",
                menuUrl: null,
                menuIcon: null,
                menuType: "button",
                buttonNo: "query",
                sortNo: 9,
                appId: "erp",
                remark: "查询按钮",
                children: null,
              },
            ],
          },
          {
            id: "5",
            menuName: "三级菜单12",
            upMenuId: "2",
            menuUrl: null,
            menuIcon: null,
            menuType: "menu",
            buttonNo: null,
            sortNo: 6,
            appId: "erp",
            remark: "test孙子菜单",
            children: [
              {
                id: "9",
                menuName: "查询按钮12",
                upMenuId: "5",
                menuUrl: null,
                menuIcon: null,
                menuType: "button",
                buttonNo: "query",
                sortNo: 10,
                appId: "erp",
                remark: "查询",
                children: null,
              },
            ],
          },
        ],
      },
      {
        id: "3",
        menuName: "二级菜单2",
        upMenuId: "1",
        menuUrl: null,
        menuIcon: null,
        menuType: "menu",
        buttonNo: null,
        sortNo: 4,
        appId: "erp",
        remark: "test子菜单",
        children: [
          {
            id: "6",
            menuName: "三级菜单21",
            upMenuId: "3",
            menuUrl: null,
            menuIcon: null,
            menuType: "menu",
            buttonNo: null,
            sortNo: 7,
            appId: "erp",
            remark: "test孙子菜单",
            children: [
              {
                id: "10",
                menuName: "编辑按钮21",
                upMenuId: "6",
                menuUrl: null,
                menuIcon: null,
                menuType: "button",
                buttonNo: "edit",
                sortNo: 11,
                appId: "erp",
                remark: "编辑",
                children: null,
              },
            ],
          },
          {
            id: "7",
            menuName: "三级菜单22",
            upMenuId: "3",
            menuUrl: null,
            menuIcon: null,
            menuType: "menu",
            buttonNo: null,
            sortNo: 8,
            appId: "erp",
            remark: "test孙子菜单",
            children: [
              {
                id: "11",
                menuName: "删除按钮22",
                upMenuId: "7",
                menuUrl: null,
                menuIcon: null,
                menuType: "button",
                buttonNo: "delete",
                sortNo: 12,
                appId: "erp",
                remark: "三级菜单22的删除",
                children: null,
              },
              {
                id: "12",
                menuName: "查询按钮22",
                upMenuId: "7",
                menuUrl: null,
                menuIcon: null,
                menuType: "button",
                buttonNo: "query",
                sortNo: 13,
                appId: "erp",
                remark: "三级菜单22的查询",
                children: null,
              },
            ],
          },
        ],
      },
    ],
  },
];
export const ADefaultTable = (args) => (
  <Table
    columns={columns}
    dataSource={[]}
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
