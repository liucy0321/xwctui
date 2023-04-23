import React, { useCallback, useState } from "react";
import { ComponentMeta } from "@storybook/react";
import Table from "./index";
import { Button } from "antd";
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
    title: "销售价",
    dataIndex: "salePrice",
    key: "salePrice",
    width: 80,
  },
  {
    title: "销售额",
    dataIndex: "salesMoney",
    key: "salesMoney",
    width: 100,
  },
  {
    title: "应收金额",
    dataIndex: "discountSalesMoney",
    key: "discountSalesMoney",
    width: 100,
    toFixedNum: 2,
    thousandth: true,
  },
];
const tableData = [
  {
    changeDetailId: "16ba1a637f014856a6a6fdf97eb921a0",
    changeId: "BGCP012303140012",
    sourceType: "1",
    sourceTypeDesc: "定额库",
    changeOption: "2",
    changeOptionDesc: "减少项目",
    positionId: 1,
    positionNo: "CDCT00134",
    positionName: "刷墙漆32223",
    calculateUnit: "㎡",
    calculateUnitDesc: "平方米",
    brand: null,
    brandDesc: null,
    specifications: null,
    model: null,
    beforeCustQuantity: 10.0,
    custQuantityChange: 1.0,
    beforeProjectQuantity: 10.0,
    projectQuantityChange: 1.0,
    salePrice: "23.00",
    salesMoney: "-233333.8944",
    discount: 100.0,
    discountSalesMoney: " 0",
    beforeMainCostPrice: 34.0,
    afterMainCostPrice: 34.0,
    mainCostMoney: -34.0,
    beforeAuxiliaryCostPrice: 323.0,
    afterAuxiliaryCostPrice: 323.0,
    auxiliaryCostMoney: -323.0,
    beforeArtificialCostPrice: 122.0,
    afterArtificialCostPrice: 122.0,
    artificialCostMoney: -122.0,
    beforeOtherCostPrice: 33.0,
    afterOtherCostPrice: 33.0,
    otherCostMoney: -33.0,
    beforeComprehensiveCost: 5120.0,
    afterComprehensiveCost: -512.0,
    remark: null,
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
  const columnsRender = {
    materialSelName: (text, record, index) => {
      return (
        <Button type="link" style={{ padding: 0 }}>
          {text}
        </Button>
      );
    },
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="materialSelDetailId"
      indentTitle="positionLevel"
      tableCode="project-material-list"
      hideDelIcon
      onMoveRow={onMoveRow}
      expandIconColumnIndex={3}
      onAddAndDelHandle={() => {}}
      columnsRender={columnsRender}
      // summaryConfig={[
      //   {
      //     type: "total",
      //     fields: [
      //       {
      //         key: "salePrice",
      //         toFixedNum: 2,
      //       },
      //       {
      //         key: "salesMoney",
      //         toFixedNum: 2,
      //       },
      //       {
      //         key: "discountSalesMoney",
      //         toFixedNum: 2,
      //       },
      //       {
      //         key: "mainCostMoney",
      //         toFixedNum: 2,
      //       },
      //     ],
      //   },
      // ]}
    />
  );
};
ADefaultTable.storyName = "基础表格";
