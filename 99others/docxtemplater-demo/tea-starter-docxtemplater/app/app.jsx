import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, Redirect, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ConfigProvider } from "@tencent/tea-component";
import { HistoryContext } from "./history-context";
import Layout from "./components/Layout";

const history = createBrowserHistory();

/**
 * @param {{
 *  routes: import("./types").AppRouteMap;
 *  menu: import("./types").AppMenu;
 * }} props
 */
function App({ routes, menu }) {
  if (
    Object.entries(routes).find(
      ([path]) => path.split("/").filter(Boolean).length > 1
    )
  ) {
    throw new Error(
      "`app.routes()` 只允许注册一级路由\n\n更多级路由请使用模块内路由方式配置：http://tapd.oa.com/tcp_access/markdown_wikis/show/#1220399462000785707"
    );
  }
  return (
    <Router history={history}>
      <HistoryContext.Provider value={{ history }}>
        <ConfigProvider>
          <Layout menu={menu}>
            <Switch>
              {Object.entries(routes).map(([path, route]) => {
                const routeProps = { path, key: path, exact: path === "/" };
                  if (typeof route === "object") {
                    if ("render" in route) {
                      return <Route {...routeProps} render={route.render} />;
                    }
                    if ("component" in route) {
                      return (
                        <Route {...routeProps} component={route.component} />
                      );
                    }
                  }
                  return (
                    <Route
                      {...routeProps}
                      component={/** @type {any}*/ (route)}
                    />
                  );
                })}
              <Route path="*">
                <Redirect to="/" />
              </Route>
            </Switch>
          </Layout>
        </ConfigProvider>
      </HistoryContext.Provider>
    </Router>
  );
}

/**
 * @param {import("./types").AppRouteMap} appRoutes
 * @param {import("./types").AppMenu} appMenu
 */
export async function routes(appRoutes, appMenu) {
  ReactDOM.render(
    <App routes={appRoutes} menu={appMenu} />,
    document.querySelector("#root")
  );
}
