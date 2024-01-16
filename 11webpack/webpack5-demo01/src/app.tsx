import { add } from './utils';
import React from 'react';
import ReactDOM from 'react-dom';
import './app.less';
ReactDOM.render(<div>{add(1,2,3, 4)}</div>, document.getElementById("root"));
// console.info(add(1,2,3, 4));
