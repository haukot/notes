import React from 'react';
import {Route, IndexRoute} from 'react-router';

import App from 'containers/app';
import Card from 'components/card';

const routes =
    <Route path="/" component={App} >
        <Route path=":id" component={Card} />
    </Route>;

export default routes;
