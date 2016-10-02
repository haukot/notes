import "app-module-path/register";

import express from 'express';
import bodyParser from 'body-parser';

import React from 'react';
import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';
import {Provider} from 'react-redux';
import transit from 'transit-immutable-js';

import savesStorage from 'server/storage';
import routes from 'routes';
import {addNote, loadState} from 'actions';
import {notes} from 'queries';
import configureStore from 'store/configure-store';

import {fromJS} from 'immutable';


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
    // store.dispatch(loadState({state: initialState}));
}

function routerMiddleware(req, res, next) {
    match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
        if (error) {
            res.status(500).send(error.message);
        } else if (redirectLocation) {
            res.redirect(302, redirectLocation.pathname + redirectLocation.search);
        } else if (renderProps) {
            savesStorage.load().then((initialState) => {
                console.log('Load store success - get initialState');
                return configureStore({present: fromJS(initialState)});
                // console.log(store.getState().present.getIn(['notes']));
            }, () => {
                console.log('Load store failed - fill store');
                let store = configureStore();
                fillStore(store);
                return store;
            }).then((store) => {
                console.log('render page');
                // const pageHtml = render(store, renderProps);
                const pageHtml = pageTemplate("", store.getState());

                res.status(200).send(pageHtml);
                res.end();
            });
        }
    });
}

function pageTemplate(html, initialState) {
    let jsonStr = JSON.stringify(transit.toJSON(initialState));
    return `
        <!doctype html>
        <html>
          <head>
            <title>Kanban</title>
            <script>
               window.__INITIAL_STATE__ = ${jsonStr};
            </script>
            <script src="/assets/bundle.js"></script>
          </head>
          <body>
            <div id='root'>${html}</div>
            <div id='dev_tools'></div>
          </body>
        </html>
    `
}


const app = express();
app.use(bodyParser.json());

app.post('/save', function(req, res) {
    savesStorage.save(req.body, () => {res.sendStatus(200)}, () => {res.sendStatus(500)});
});

app.use(routerMiddleware);

const server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});
