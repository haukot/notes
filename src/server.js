import "app-module-path/register";

import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import {Provider} from 'react-redux';
import transit from 'transit-immutable-js';

import routes from 'routes';
import {addNote} from 'actions';
import {notes} from 'queries';
import configureStore from 'store/configure-store';

function pageTemplate(html, initialState) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Kanban</title>
            <script>
                window.__INITIAL_STATE__ = '${transit.toJSON(initialState)}';
            </script>
            <script src="/assets/bundle.js"></script>
          </head>
          <body>
            <div id='root' class='_full-height'>${html}</div>
            <div id='dev_tools'></div>
          </body>
        </html>
    `
}

function render(store, renderProps) {
    const renderedComponent = renderToString(
        <Provider store={store}>
            <RoutingContext {...renderProps} />
        </Provider>
    );
    const finalState = store.getState();
    return pageTemplate(renderedComponent, finalState);
}

function fillStore(store) {
    store.dispatch(addNote({title: 'Todo'}));
    store.dispatch(addNote({title: 'In process'}));
}

function routerMiddleware(req, res, next) {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {

            const store = configureStore();
            fillStore(store);
            const pageHtml = render(store, renderProps);

            res.status(200).send(pageHtml);
        }
    });

    next();
}

const app = express();
app.use(routerMiddleware);

const server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});
