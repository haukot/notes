import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/app';
import EditorApp from 'containers/editor';

const routes =
      <Route>
        <Route path="/" component={App} >
        </Route>
        <Route path="/root/:id" component={App} />
        <Route path="/editor" component={EditorApp} />
    </Route>;

export default routes;
