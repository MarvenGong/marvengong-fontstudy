// @ts-nocheck
import React from "react";
import { withRouter } from "react-router-dom";
import { Layout as TeaLayout, NavMenu } from "@tencent/tea-component";
import Menu from "./Menu";

const { Header, Body, Sider } = TeaLayout;

function Layout({ history, menu, children }) {
  return (
    <TeaLayout>
      {/* <Header>
        <NavMenu
          left={
            <NavMenu.Item type="logo" onClick={() => history.push("/")}>
              <img src="//imgcache.qq.com/qcloud/app/tea/logo.svg" alt="logo" />
            </NavMenu.Item>
          }
        />
      </Header> */}
      <Body>
        {/* {menu && (
          <Sider>
            <Menu menu={menu} />
          </Sider>
        )} */}
        {children}
      </Body>
    </TeaLayout>
  );
}

export default withRouter(Layout);
