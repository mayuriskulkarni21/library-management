import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store/index.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter, Route } from "react-router-dom";
import ShowWholeForm from './components/showForm';
import CreateForm from './components/createForm';
import './style.css';

ReactDOM.render(
    <Provider store={configureStore()}>
        <HashRouter>
            <Route exact path="/" component={CreateForm} />
            <Route path="/form/:id" component={ShowWholeForm} />
        </HashRouter>
    </Provider>,
    document.getElementById('root')
);