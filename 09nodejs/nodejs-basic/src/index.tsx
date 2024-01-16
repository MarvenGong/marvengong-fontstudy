import './styles/index.css';
const {isEmpty} = require('./utils.js');
import React from 'react';
import ReactDOM from "react-dom";
import { trim } from './tools';
import HelloWord from './components/HelloWord';
console.log(isEmpty());
console.log(trim('sss'));
ReactDOM.render(<HelloWord />, document.getElementById("root"));


