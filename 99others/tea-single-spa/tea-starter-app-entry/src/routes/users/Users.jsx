import React from "react";
import { Layout, Card } from "@tencent/tea-component";
import { Router, Route, Switch, Link, useParams } from "react-router-dom";
import { useHistory } from "@tea/app";
const { Body, Content } = Layout;

function UserDetail() {
  const { name } = useParams();
  const history = useHistory();

  return (
    <Content>
      <Content.Header
        title="Users"
        showBackButton
        onBackButtonClick={() => history.push("/users")}
      />
      <Content.Body>
        <Card>
          <Card.Body>{name}</Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
}

function UserOverview() {
  return (
    <Content>
      <Content.Header title="Users" />
      <Content.Body>
        <Card>
          <Card.Body>
            <Link to="/users/alice">Alice</Link>
            <br />
            <Link to="/users/bob">Bob</Link>
          </Card.Body>
        </Card>
      </Content.Body>
    </Content>
  );
}

export function Users() {
  const history = useHistory();
  return (
    <Body>
      <Router history={history}>
        <Switch>
          <Route exact path="/users" component={UserOverview} />
          <Route path="/users/:name" component={UserDetail} />
        </Switch>
      </Router>
    </Body>
  );
}
