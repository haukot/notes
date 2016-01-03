import 'client.css';

import React from 'react';
import {render} from 'react-dom';
import {Router} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import {Provider} from 'react-redux';


import routes from 'routes';
import configureStore from 'store/configure-store';
import DevTools from 'containers/dev-tools';

const history = createBrowserHistory();
const store = configureStore(window.__INITIAL_STATE__);

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
