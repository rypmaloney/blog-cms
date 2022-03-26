import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import RouteSwitch from './App';
import {
    BrowserRouter,
    Routes,
    Route,
    useParams,
    HashRouter,
} from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
