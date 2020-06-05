import React, { useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom'
import { Spin } from "antd";
import 'antd/dist/antd.css'

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserContext from './context/UserContext'
import {useHistory} from 'react-router-dom'

const MainApp = () => {



  return (
    <React.StrictMode>
    <Suspense fallback={<Spin size='large' />}>
      <Router>
      <App></App>
    </Router>
    </Suspense>
    </React.StrictMode>
  )
}


ReactDOM.render(
  <MainApp></MainApp>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
