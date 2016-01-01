import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from 'components/layout';
import Card from 'components/card';

const routes =
    <Route path="/" component={Layout} >
        <Route path=":id" component={Card} />
    </Route>;

export default routes;
