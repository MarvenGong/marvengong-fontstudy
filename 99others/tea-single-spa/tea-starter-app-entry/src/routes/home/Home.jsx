import React from "react";
import { Layout, ExternalLink, Card } from "@tencent/tea-component";
const { Body, Content } = Layout;

export function Home() {
  return (
    <div>
      {/* <Content>
        <Content.Header
          title="Home"
          operation={<ExternalLink weak>Home</ExternalLink>}
        ></Content.Header>
        <Content.Body>
          <Card>
            <Card.Body> */}
              <micro-app name='app1' url='http://localhost:80/' baseroute='/my-page'></micro-app>
            {/* </Card.Body>
          </Card>
        </Content.Body>
      </Content> */}
    </div>
  );
}
