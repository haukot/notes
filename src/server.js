import "app-module-path/register";

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import {Provider} from 'react-redux';
import express from 'express';

import routes from 'routes';
import configureStore from 'store/configure-store';

import {addSection} from 'actions/sections';

function renderFullPage(html, initialState) {
    return `
        <!doctype html>
        <html>
          <head>
            <title>Kanban</title>
            <script>
                window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
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

const app = express();

app.use((req, res, next) => {
    // Note that req.url here should be the full URL path from
    // the original request, including the query string.
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message)
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {

            const store = configureStore();
            store.dispatch(addSection('todo'));

            const renderedComponent = renderToString(
                <Provider store={store}>
                    <RoutingContext {...renderProps} />
                </Provider>
            );
            const finalState = store.getState();
            const pageHtml = renderFullPage(renderedComponent, finalState);
            res.status(200).send(pageHtml);
        }
    });

    next();
});

const server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});
