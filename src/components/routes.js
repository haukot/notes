import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Board from 'components/board';
import Card from 'components/card';

const routes =
    <Route path="/" component={Board} >
        <Route path=":id" component={Card} />
    </Route>;

export default routes;
