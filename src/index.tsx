import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import "./styles/index.scss";

library.add(fas);
// export { default as Button } from "./components/Button";
export { default as Table } from "./components/Table";
export { default as Form } from "./components/Form";
export { default as Footer } from "./components/Footer";
export { default as Container } from "./components/Container";
export type { SelectProps } from "antd/lib/select";
export type { ColumnsType } from "antd/lib/table";
export type { ItemType } from "antd/lib/menu/hooks/useItems";
export type { ButtonType } from "antd/lib/button";

export {
  Button,
  Input,
  Checkbox,
  Menu,
  Pagination,
  Tabs,
  Layout,
  Modal,
  Upload,
  DatePicker,
  Radio,
  Switch,
} from "antd";
export {
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
} from "antd";
export { default as zhCN } from "antd/lib/locale/zh_CN";
export { default as Icon, createFromIconfontCN } from "@ant-design/icons";
