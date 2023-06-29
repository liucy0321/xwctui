import React, { FC, useState } from "react";
import { Modal, InputNumber, Switch, Checkbox, Button, message } from "antd";
import XwTable from "./index";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ColumnsType } from "./table";
import axios from "axios";

export interface IColumnsProps {
  open?: boolean;
  onClose: () => void;
  dynamicData: any;
  setDynamicData: any;
  tableCode?: string;
  onReload?: () => void;
}

export const TableColumns: FC<IColumnsProps> = (colProps) => {
  const { open, onClose, dynamicData, setDynamicData, tableCode, onReload } =
    colProps;
  const [loading, setLoading] = useState(false);
  const fixedOptions = [
    { label: "左固定", value: "L" },
    { label: "右固定", value: "R" },
  ];
  const dynamicColumns: ColumnsType<any> = [
    {
      title: "排序",
      width: 50,
      fixed: "left",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "列名（拖动列名排序）",
      dataIndex: "columnDesc",
      key: "columnDesc",
      width: 150,
    },
    {
      title: "列宽",
      dataIndex: "columnWidth",
      key: "columnWidth",
      width: 80,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <InputNumber
              min={30}
              max={260}
              precision={0}
              value={value}
              onBlur={(e) =>
                onChangeByDynamic("columnWidth", e.currentTarget.value, index)
              }
            />
          </>
        );
      },
    },
    {
      title: "是否显示",
      dataIndex: "ifShow",
      key: "ifShow",
      width: 80,
      align: "center",
      render: (value, record, index) => {
        return (
          <Switch
            checkedChildren="显示"
            unCheckedChildren="隐藏"
            defaultChecked
            checked={value === "Y"}
            onChange={(value) => {
              onChangeByDynamic("ifShow", value ? "Y" : "N", index);
            }}
          />
        );
      },
    },
    {
      title: "是否固定",
      dataIndex: "ifFixed",
      key: "ifFixed",
      width: 150,
      align: "center",
      render: (value, record, index) => {
        return (
          <>
            <Checkbox.Group
              options={fixedOptions}
              value={value}
              onChange={(val) => {
                let copyVal: any = "";
                if (val?.length === 2) {
                  copyVal = value === "L" ? "R" : "L";
                } else if (val?.length === 1) {
                  copyVal = val?.[0];
                }
                onChangeByDynamic("ifFixed", copyVal, index);
              }}
            />
          </>
        );
      },
    },
  ];
  /**
   * change
   */
  const onChangeByDynamic = (title, value, index) => {
    const copyData = [...dynamicData];
    copyData[index][title] = value;
    setDynamicData(copyData);
  };
  /**
   * 恢复默认设置
   */
  const onRestoreHandle = () => {
    setLoading(true);
    axios
      .post("/mapi/oper/tableConfig/reset", { tableCode })
      .then((response) => {
        setLoading(false);
        if (response?.data?.isSuccess) {
          onClose();
          if (onReload) onReload();
          message.success("重置成功");
        } else {
          message.error(response?.data?.msg);
        }
      })
      .catch((error) => {});
  };
  /**
   * 保存
   */
  const onSaveHandel = () => {
    setLoading(true);
    // 数据处理
    axios
      .post("/mapi/oper/tableConfig/adjust", {
        tableCode,
        tableColList: dynamicData,
      })
      .then((response) => {
        setLoading(false);
        if (response?.data?.isSuccess) {
          onClose();
          if (onReload) onReload();
          message.success("保存成功");
        } else {
          message.error(response?.data?.msg);
        }
      })
      .catch((error) => {});
  };
  // 拖拽事件（返回最终结果）
  const onMoveRow = (data, dragParentIndex, operateType) => {
    setDynamicData(data);
    let copyData = [...data];
    /**
     * 重新排序
     */
    for (let i = 0; i < copyData?.length; i++) {
      if (copyData[i]) copyData[i].sortNo = i + 1;
    }
  };
  return (
    <>
      <Modal
        title="列设置"
        onCancel={onClose}
        open={open}
        width={800}
        getContainer={false}
        maskClosable={false}
        className="col_setting_modal"
        footer={
          <>
            <Button type="default" onClick={onRestoreHandle} loading={loading}>
              恢复默认设置
            </Button>
            <Button type="primary" onClick={onSaveHandel} loading={loading}>
              确定
            </Button>
          </>
        }
      >
        <DndProvider backend={HTML5Backend}>
          <XwTable
            loading={loading}
            scroll={{ x: 600, y: 480 }}
            bordered
            columns={dynamicColumns}
            dataSource={dynamicData}
            pagination={false}
            onMoveRow={onMoveRow}
            rowKey="columnName"
            parentChildSign={["columnName"]}
            ifColumnDrag={false}
          />
        </DndProvider>
      </Modal>
    </>
  );
};

export default TableColumns;
