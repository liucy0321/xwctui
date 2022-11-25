import React from "react";
import { ComponentMeta } from "@storybook/react";
import Table from "./index";
import { ColumnsType } from "./table";

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
    width: 150,
    fixed: "left",
  },
  {
    title: "序号",
    width: 80,
    fixed: "left",
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: "销售价",
    dataIndex: "salePrice",
    key: "salePrice",
    width: 150,
    fixed: "left",
    required: true,
    thousandth: true,
    toFixedNum: 3,
  },
  {
    title: "主材成本",
    hideColumn: true,
    dataIndex: "mainCostPrice",
    key: "mainCostPrice",
    width: 180,
  },
  {
    title: "用户类型",
    dataIndex: "userType",
    key: "userType",
    width: 180,
    render: (text, record, index) => {
      switch (text) {
        case "A":
          return "系统管理员";
        case "Y":
          return "员工";
        case "G":
          return "供应商";
        case "Z":
          return "装修工长";
      }
    },
  },
  {
    title: "辅材成本",
    dataIndex: "auxiliaryCostPrice",
    key: "auxiliaryCostPrice",
    width: 100,
  },
  {
    title: "角色列表",
    dataIndex: "roleNameList",
    key: "roleNameList",
    width: 200,
    render: (text, record, index) => {
      if (text) {
        let roleStr = "";
        for (let index in text) {
          roleStr += text[index] + "，";
        }
        return roleStr.slice(0, roleStr.length - 1);
      }
    },
  },
  {
    title: "生效日期",
    dataIndex: "validateStartTime",
    key: "validateStartTime",
    align: "center",
    width: 150,
  },
  {
    title: "失效日期",
    dataIndex: "validateEndTime",
    key: "validateEndTime",
    align: "center",
    width: 150,
  },
  {
    title: "备注",
    dataIndex: "remark",
    key: "remark",
    width: 150,
  },
  {
    title: "状态",
    dataIndex: "recordState",
    key: "recordState",
    align: "center",
    fixed: "right",
    width: 80,
    render: (text, record, index) => (text === "Y" ? "有效" : "无效"),
  },
];
const tableData = [
  {
    templateDetailId: 1,
    templateId: "010001201",
    positionType: "1",
    positionTypeDesc: "部",
    sourceType: null,
    positionSort: 0,
    positionId: 0,
    positionNo: "0",
    positionName: "预算模板测试1",
    upDetailId: 0,
    positionLevel: 1,
    calculateUnit: null,
    calculateUnitDesc: null,
    salePrice: null,
    mainCostPrice: null,
    auxiliaryCostPrice: null,
    artificialCostPrice: null,
    otherCostPrice: null,
    totalCostPrice: null,
    projectDes: null,
    remark: null,
    children: [
      {
        templateDetailId: 2,
        templateId: "010001201",
        positionType: "1",
        positionTypeDesc: "部",
        sourceType: null,
        positionSort: 1,
        positionId: 1112,
        positionNo: "001_01",
        positionName: "分部1",
        upDetailId: 1,
        positionLevel: 1,
        calculateUnit: null,
        calculateUnitDesc: null,
        salePrice: null,
        mainCostPrice: null,
        auxiliaryCostPrice: null,
        artificialCostPrice: null,
        otherCostPrice: null,
        totalCostPrice: null,
        projectDes: null,
        remark: null,
        children: [
          {
            templateDetailId: 3,
            templateId: "010001201",
            positionType: "2",
            positionTypeDesc: "清",
            sourceType: null,
            positionSort: 1,
            positionId: 1,
            positionNo: "001",
            positionName: "分部1_清1",
            upDetailId: 2,
            positionLevel: 2,
            calculateUnit: null,
            calculateUnitDesc: null,
            salePrice: null,
            mainCostPrice: null,
            auxiliaryCostPrice: null,
            artificialCostPrice: null,
            otherCostPrice: null,
            totalCostPrice: null,
            projectDes: null,
            remark: null,
            children: [
              {
                templateDetailId: 5,
                templateId: "010001201",
                positionType: "3",
                positionTypeDesc: "定",
                sourceType: "1",
                positionSort: 1,
                positionId: 1,
                positionNo: "CDCT001",
                positionName: "刷墙漆",
                upDetailId: 3,
                positionLevel: 3,
                calculateUnit: "1",
                calculateUnitDesc: null,
                salePrice: 222122.0,
                mainCostPrice: 22.0,
                auxiliaryCostPrice: 323.0,
                artificialCostPrice: 122.0,
                otherCostPrice: 33.0,
                totalCostPrice: 222.0,
                projectDes: "你要好好刷",
                remark: "TESTBBA",
                children: null,
              },
              {
                templateDetailId: 6,
                templateId: "010001201",
                positionType: "3",
                positionTypeDesc: "定",
                sourceType: null,
                positionSort: 1,
                positionId: 2,
                positionNo: "d0002",
                positionName: "分部1_清1_定2",
                upDetailId: 3,
                positionLevel: 3,
                calculateUnit: null,
                calculateUnitDesc: null,
                salePrice: null,
                mainCostPrice: null,
                auxiliaryCostPrice: null,
                artificialCostPrice: null,
                otherCostPrice: null,
                totalCostPrice: null,
                projectDes: null,
                remark: null,
                children: null,
              },
            ],
          },
        ],
      },
      {
        templateDetailId: 4,
        templateId: "010001201",
        positionType: "1",
        positionTypeDesc: "部",
        sourceType: null,
        positionSort: 2,
        positionId: 1113,
        positionNo: "001_02",
        positionName: "分部2",
        upDetailId: 1,
        positionLevel: 1,
        calculateUnit: null,
        calculateUnitDesc: null,
        salePrice: null,
        mainCostPrice: null,
        auxiliaryCostPrice: null,
        artificialCostPrice: null,
        otherCostPrice: null,
        totalCostPrice: null,
        projectDes: null,
        remark: null,
        children: [
          {
            templateDetailId: 7,
            templateId: "010001201",
            positionType: "2",
            positionTypeDesc: "清",
            sourceType: null,
            positionSort: 2,
            positionId: 2,
            positionNo: "002",
            positionName: "分部2_清1",
            upDetailId: 4,
            positionLevel: 2,
            calculateUnit: null,
            calculateUnitDesc: null,
            salePrice: null,
            mainCostPrice: null,
            auxiliaryCostPrice: null,
            artificialCostPrice: null,
            otherCostPrice: null,
            totalCostPrice: null,
            projectDes: null,
            remark: null,
            children: null,
          },
        ],
      },
    ],
  },
];
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: any) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};
export const ADefaultTable = (args) => (
  <Table
    columns={columns}
    dataSource={tableData}
    rowKey="userNo"
    // showColumnDynamic
    rowSelection={{
      type: "radio",
      ...rowSelection,
    }}
    expandIconColumnIndex={3}
    onAddAndDelHandle={() => {}}
    summaryConfig={[
      {
        type: "total",
        fields: [
          {
            key: "salePrice",
            value: 22,
            toFixedNum: 2,
          },
          {
            key: "mainCostPrice",
            toFixedNum: 2,
          },
          {
            key: "auxiliaryCostPrice",
            toFixedNum: 2,
          },
          {
            key: "artificialCostPrice",
            toFixedNum: 2,
          },
          {
            key: "totalCostPrice",
            toFixedNum: 2,
          },
        ],
      },
    ]}
  />
);
ADefaultTable.storyName = "基础表格";
