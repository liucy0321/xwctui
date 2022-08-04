import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./styles/index.scss";

library.add(fas);

export { default as Button } from "./components/Button";
export { default as Select } from "./components/Select";
export { default as Table } from "./components/Table";
export type { SelectProps } from "antd/lib/select";
export type { ColumnsType } from "antd/lib/table";
export {
  Input,
  Form,
  Checkbox,
  Menu,
  Pagination,
  Tabs,
  Layout,
  Modal,
  Upload,
} from "antd";
export {
  ConfigProvider,
  Drawer,
  message,
  Space,
  Grid,
  Divider,
  Dropdown,
  Badge,
  List,
  Result,
  Spin,
  Popconfirm,
  TreeSelect,
  Tree,
  Progress,
  Cascader,
  Tooltip,
  Descriptions,
  Image,
  Popover,
  Breadcrumb,
  Transfer,
  Row,
  Col,
} from "antd";
export { default as zhCN } from "antd/lib/locale/zh_CN";
export { default as Icon, createFromIconfontCN } from "@ant-design/icons";
