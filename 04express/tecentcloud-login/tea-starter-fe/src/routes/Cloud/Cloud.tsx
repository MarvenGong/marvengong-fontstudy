import React, { useState, useEffect } from 'react';
import './style.less';
import { Router, Route } from 'react-router-dom';
import Callback from './Callback/index';
const Cloud = (props: any) => {
  const { name } = props;
  const [data, setData] = useState<any>();
  useEffect(() => {
    // todo something when componentDidMount
    return () => {
      // todo something when componentWillUnmount
    };
  }, []);
  const { history = {} } = props;
  return (
    <div className="cloud-wraper">
      <Router history={history}>
        <Route path="/cloud/login/callback" component={Callback} exact />
      </Router>
    </div>
  );
};
export default Cloud;
