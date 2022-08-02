## xwctui component library

## 使用 React+typescript+antd 二次封装扩展 antd 组件库

[![Build Status](https://travis-ci.com/vikingmute/vikingship.svg?token=mHoDqxyxXWX5BSpu8L9y&branch=master)](https://travis-ci.com/vikingmute/vikingship)

xwctui 是为彩兔装企系统打造的一套业务流程组件库，使用 React Hooks 和 typescript 二次封装 antd 组件库
，贴合业务代码与功能，根据业务自定义扩展组件功能。

### 安装最后已经发布的组件库来试试

```javascript
npm install xwctui --save
```

### 使用

```javascript
// 加载样式
import "xwctui/dist/index.css";
// 引入组件
import { Button } from "xwctui";
```

### 一些本地开发命令

```bash
//启动本地环境
npm run stroybook

//跑单元测试
npm test

//build可发布静态文件
npm run build

//发布到 npm
npm run publish
```
