import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { Provider } from 'react-redux'
import configureStore from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <App />
    </Provider>,
    document.getElementById('root')
);