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
import {deserialize} from './utils/editor';


const history = createBrowserHistory();
let initialState = transit.fromJSON(window.__INITIAL_STATE__);
// TODO для past и future не работает
// Object.keys(initialState).map((key) => {
//     initialState[key] = // в past - Array, в present - текущий стейт мапой
// });
initialState.present = initialState.present.updateIn(['notes'], (notes) =>
                                    notes.map((note) => note.updateIn(['title'], deserialize)));
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
