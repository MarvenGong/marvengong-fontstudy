import "core-js/stable";
import "regenerator-runtime/runtime";

// 导入依赖
import { app } from "@tea/app";

// 导入导航配置
import { menu } from "./configs/menu";

// 导入组件
import { Home } from "./routes/home";
import SimpleGraph from "./routes/SimpleGraph";
import RealTreeGraph from './routes/RealTreeGraph';
import Cloud from "./routes/Cloud";
import RegsiterIndex from './routes/Register';

// 导入样式
import "@tencent/tea-component/lib/tea.css";
import "./app.less";
import JsonDiff from './routes/JsonDiff/JsonDiff';

// 路由表，一个路由对应一个组件
const routes = {
  "/": Home,
  "/cloud": Cloud,
  "/simplegraph": SimpleGraph,
  "/realTreeGraph": RealTreeGraph,
  "/register": RegsiterIndex,
  "/jsondiff": JsonDiff,
};

// 注册路由表/左侧菜单
app.routes(routes, menu);
