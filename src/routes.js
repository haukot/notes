import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/app';
import Card from 'components/card';

const routes =
      <Route>
        <Route path="/" component={App} >
        </Route>
        <Route path="/root/:id" component={App} />
    </Route>;

export default routes;
