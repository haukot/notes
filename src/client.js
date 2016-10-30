import 'client.css';

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';
import transit from 'transit-immutable-js';

import Modal from 'react-modal';

import routes from 'routes';
import configureStore from 'store/configure-store';
import DevTools from 'containers/dev-tools';
import {deserializeState} from './utils/save';

const history = createBrowserHistory();
let initialState = deserializeState(window.__INITIAL_STATE__);
const store = configureStore(initialState);

const renderApp = () => {
    render(
        <Provider store={store}>
            <Router history={history} routes={routes} />
        </Provider>,
        document.getElementById('root')
    );
};

const renderDevTools = () => {
    render(
        <Provider store={store}>
            <DevTools />
        </Provider>,
        document.getElementById('dev_tools')
    );
};

document.addEventListener('DOMContentLoaded', renderApp);
document.addEventListener('DOMContentLoaded', renderDevTools);
