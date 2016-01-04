import {createStore, compose} from 'redux';
import reducer from 'reducers';

import DevTools from 'containers/dev-tools';

const finalCreateStore = compose(
    // Middleware you want to use in development:
    //applyMiddleware(d1, d2, d3),
    DevTools.instrument()
)(createStore);


export default function configureStore(initialState) {
    const store = finalCreateStore(reducer, initialState);

    if (module.hot) {
         module.hot.accept('reducers', () => {
            const nextReducerModule = require('reducers');
            store.replaceReducer(nextReducerModule.default);
        })
    }

    return store;
}
