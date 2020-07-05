import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import './index.css';
import App from './App';
import Login from './components/pages/login/login';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router } from 'react-router-dom';

var token = localStorage.getItem("token");
if (token == null)
    ReactDOM.render(<Router><Login /></Router>, document.getElementById('root'));
else
    ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));

registerServiceWorker();
