import "app-module-path/register";

import express from 'express';

import React from 'react';
import {renderToString} from 'react-dom/server';

import {match, RoutingContext} from 'react-router';
import routes from 'components/routes';

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

            const renderedComponent = renderToString(<RoutingContext {...renderProps} />);


            const html = `
                <!doctype html>
                <html>
                  <head>
                    <title>Your App</title>
                    <script src="/assets/bundle.js"></script>
                  </head>
                  <body>
                    <div id='root' class='_full-height'>${renderedComponent}</div>
                  </body>
                </html>
            `;

            res.status(200).send(html);
        }
    });

    next();
});

const server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});
