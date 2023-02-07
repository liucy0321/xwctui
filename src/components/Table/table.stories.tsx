import React, { useCallback, useState } from "react";
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
const columns: ColumnsType<any> = [
  {
    title: "选材类别",
    dataIndex: "selMaterialTypeName",
    key: "selMaterialTypeName",
    fixed: "left",
    ifShowIndent: true,
    width: 150,
  },
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "人数",
    dataIndex: "number",
    key: "number",
  },
];
const tableData = [
  {
    materialSelId: "MSCP012212190001",
    materialSelDetailId: "4d7ffc97acc4463aab27ef062d91c865",
    selMaterialTypeId: "10001",
    selMaterialTypeName: "厨房橱柜",
    goodsNo: null,
    goodsName: null,
    sortNo: 1,
    level: 1,
    materialGroup: null,
    materialGroupDesc: null,
    calculateUnit: null,
    calculateUnitDesc: null,
    specifications: null,
    model: null,
    brand: null,
    brandDesc: null,
    goodsDesc: null,
    ifNeedPitchMaterial: null,
    upSelDetailId: null,
    quantity: null,
    salePrice: null,
    totalSalesPrice: null,
    mainCostPrice: null,
    mainCostMoney: null,
    auxiliaryCostPrice: null,
    auxiliaryCostMoney: null,
    comprehensiveCost: null,
    profit: null,
    profitRate: null,
    children: [
      {
        materialSelId: "MSCP012212190001",
        materialSelDetailId: "d7bdf8fcbd5d4d0b9032abf231caea65",
        selMaterialTypeId: null,
        selMaterialTypeName: "21212",
        goodsNo: null,
        goodsName: null,
        sortNo: 1,
        level: 2,
        materialGroup: null,
        materialGroupDesc: null,
        calculateUnit: null,
        calculateUnitDesc: null,
        specifications: null,
        model: null,
        brand: null,
        brandDesc: null,
        goodsDesc: null,
        ifNeedPitchMaterial: null,
        upSelDetailId: "4d7ffc97acc4463aab27ef062d91c865",
        quantity: null,
        salePrice: null,
        totalSalesPrice: null,
        mainCostPrice: null,
        mainCostMoney: null,
        auxiliaryCostPrice: null,
        auxiliaryCostMoney: null,
        comprehensiveCost: null,
        profit: null,
        profitRate: null,
        children: null,
      },
    ],
  },
  {
    materialSelId: "MSCP012212190001",
    materialSelDetailId: "f05b47836d0a4cd4bf307639196215a4",
    selMaterialTypeId: "10003",
    selMaterialTypeName: "次卫洁具",
    goodsNo: null,
    goodsName: null,
    sortNo: 1,
    level: 1,
    materialGroup: null,
    materialGroupDesc: null,
    calculateUnit: null,
    calculateUnitDesc: null,
    specifications: null,
    model: null,
    brand: null,
    brandDesc: null,
    goodsDesc: null,
    ifNeedPitchMaterial: null,
    upSelDetailId: null,
    quantity: null,
    salePrice: null,
    totalSalesPrice: null,
    mainCostPrice: null,
    mainCostMoney: null,
    auxiliaryCostPrice: null,
    auxiliaryCostMoney: null,
    comprehensiveCost: null,
    profit: null,
    profitRate: null,
    children: null,
  },
  {
    materialSelId: "MSCP012212190001",
    materialSelDetailId: "1852df4795534b4f9366f5b520885cfc",
    selMaterialTypeId: "10004",
    selMaterialTypeName: "客厅瓷砖",
    goodsNo: null,
    goodsName: null,
    sortNo: 3,
    level: 1,
    materialGroup: null,
    materialGroupDesc: null,
    calculateUnit: null,
    calculateUnitDesc: null,
    specifications: null,
    model: null,
    brand: null,
    brandDesc: null,
    goodsDesc: null,
    ifNeedPitchMaterial: null,
    upSelDetailId: null,
    quantity: null,
    salePrice: null,
    totalSalesPrice: null,
    mainCostPrice: null,
    mainCostMoney: null,
    auxiliaryCostPrice: null,
    auxiliaryCostMoney: null,
    comprehensiveCost: null,
    profit: null,
    profitRate: null,
    children: null,
  },
  {
    materialSelId: "MSCP012212190001",
    materialSelDetailId: "8133cd0a137444219a136e6cbe2fe3de",
    selMaterialTypeId: "10002",
    selMaterialTypeName: "主卫洁具",
    goodsNo: null,
    goodsName: null,
    sortNo: 4,
    level: 1,
    materialGroup: null,
    materialGroupDesc: null,
    calculateUnit: null,
    calculateUnitDesc: null,
    specifications: null,
    model: null,
    brand: null,
    brandDesc: null,
    goodsDesc: null,
    ifNeedPitchMaterial: null,
    upSelDetailId: null,
    quantity: null,
    salePrice: null,
    totalSalesPrice: null,
    mainCostPrice: null,
    mainCostMoney: null,
    auxiliaryCostPrice: null,
    auxiliaryCostMoney: null,
    comprehensiveCost: null,
    profit: null,
    profitRate: null,
    children: [
      {
        materialSelId: "MSCP012212190001",
        materialSelDetailId: "257319fd0759447da3f2e83848262f91",
        selMaterialTypeId: null,
        selMaterialTypeName: "1",
        goodsNo: null,
        goodsName: null,
        sortNo: 1,
        level: 2,
        materialGroup: null,
        materialGroupDesc: null,
        calculateUnit: null,
        calculateUnitDesc: null,
        specifications: null,
        model: null,
        brand: null,
        brandDesc: null,
        goodsDesc: null,
        ifNeedPitchMaterial: null,
        upSelDetailId: "8133cd0a137444219a136e6cbe2fe3de",
        quantity: null,
        salePrice: null,
        totalSalesPrice: null,
        mainCostPrice: null,
        mainCostMoney: null,
        auxiliaryCostPrice: null,
        auxiliaryCostMoney: null,
        comprehensiveCost: null,
        profit: null,
        profitRate: null,
        children: null,
      },
      {
        materialSelId: "MSCP012212190001",
        materialSelDetailId: "4ced8e31bda840ebb9442f8ccd7c7d3a",
        selMaterialTypeId: null,
        selMaterialTypeName: "2",
        goodsNo: null,
        goodsName: null,
        sortNo: 2,
        level: 2,
        materialGroup: null,
        materialGroupDesc: null,
        calculateUnit: null,
        calculateUnitDesc: null,
        specifications: null,
        model: null,
        brand: null,
        brandDesc: null,
        goodsDesc: null,
        ifNeedPitchMaterial: null,
        upSelDetailId: "8133cd0a137444219a136e6cbe2fe3de",
        quantity: null,
        salePrice: null,
        totalSalesPrice: null,
        mainCostPrice: null,
        mainCostMoney: null,
        auxiliaryCostPrice: null,
        auxiliaryCostMoney: null,
        comprehensiveCost: null,
        profit: null,
        profitRate: null,
        children: null,
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
    disabled: record?.name === "Disabled User", // Column configuration not to be checked
    name: record?.name,
  }),
};
export const ADefaultTable = (args) => {
  const [data, setData] = useState(tableData);
  const onMoveRow = useCallback((data) => {
    setData(data);
  }, []);
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="materialSelDetailId"
      indentTitle="positionLevel"
      // showColumnDynamic
      rowSelection={{
        type: "radio",
        ...rowSelection,
      }}
      hideDelIcon
      parentChildSign={["materialSelDetailId", "upSelDetailId"]}
      onMoveRow={onMoveRow}
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
};
ADefaultTable.storyName = "基础表格";
