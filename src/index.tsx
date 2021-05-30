import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router } from "react-router-dom"
import { Provider } from 'react-redux'
import history from './history'
import store from "./services/store"
import "./css/reset.css"
import 'antd/dist/antd.css'

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider >,
  document.getElementById('root')
);


