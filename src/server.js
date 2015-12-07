import React from 'react';
import ReactDom from 'react-dom';
import {renderToString} from 'react-dom/server';


import App from 'components/app';

const renderedComponent = renderToString(<App />);



import express from 'express';

const app = express();

app.get('/', (req, res) => {
    const html = `
        <!doctype html>
        <html>
          <head>
            <title>Your App</title>
          </head>
          <body>
            <div id='root'>${renderedComponent}</div>
            <script src="/assets/bundle.js"></script>
          </body>
        </html>
    `;


    res.send(html);
});

const server = app.listen(8080, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port)
});
