/**
 * 定义导航菜单
 * @type {import('@tea/app/types').AppMenu}
 */
export const menu = {
  title: "FE",
  items: [
    { route: "/", title: "登录SASS" },
    { route: "/register", title: "注册" },
    { route: "/cloud/login/callback", title: "登录SASS回调" },
    { route: "/simplegraph", title: "简单连线图" },
    { route: "/realTreeGraph", title: "jsplumb树图" }
  ]
};
