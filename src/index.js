import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import "antd/dist/antd.css";

import store from './redux';
import {Provider} from 'react-redux'
console.log(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <App />
    </Provider>
);

