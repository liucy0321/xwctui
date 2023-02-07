import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./styles/index.scss";

library.add(fas);
// export { default as Button } from "./components/Button";
export { default as Table } from "./components/Table";
export { default as Form } from "./components/Form";
export { default as Footer } from "./components/Footer";
export { default as Container } from "./components/Container";
// export { default as Input } from "./components/Input";
export { default as QuickQuery } from "./components/QuickQuery";
export { default as HoverWindow } from "./components/HoverWindow";
export type { SelectProps } from "antd/lib/select";
export type { ColumnsType } from "./components/Table/table";
export type { ItemType } from "antd/lib/menu/hooks/useItems";
export type { TableRowSelection } from "antd/lib/table/interface";
export type { ButtonProps, ButtonShape, ButtonType } from "antd/lib/button";
export { default as timeTransForm } from "./utils/timeTransForm";
export type { InputRef } from "antd/lib/input/Input";
export {
  DatePicker,
  Button,
  Checkbox,
  Menu,
  Pagination,
  Tabs,
  Layout,
  Modal,
  Upload,
  Radio,
  Switch,
  InputNumber,
  Input,
} from "antd";
export {
  Calendar,
  Alert,
  Select,
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
  Collapse,
  Tag,
} from "antd";
export { default as zhCN } from "antd/lib/locale/zh_CN";
export { default as Icon, createFromIconfontCN } from "@ant-design/icons";
