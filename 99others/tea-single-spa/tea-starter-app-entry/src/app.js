import "core-js/stable";
import "regenerator-runtime/runtime";
import microApp from '@micro-zoe/micro-app'

import * as singleSpa from 'single-spa';

// 导入依赖
import { app } from "@tea/app";

// 导入导航配置
import { menu } from "./configs/menu";

// 导入组件
import { Home } from "./routes/home";
import { Users } from "./routes/users";

// 导入样式
import "@tencent/tea-component/lib/tea.css";
import "./app.less";

// 路由表，一个路由对应一个组件
const routes = {
  "/": Home,
  "/users": Users
};

// 注册路由表/左侧菜单
app.routes(routes, menu);



microApp.start()
