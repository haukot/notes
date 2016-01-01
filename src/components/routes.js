import React from 'react';
import {Route, IndexRoute} from 'react-router';

import Board from 'components/board';

const routes =
    <Route path="/" >
        <IndexRoute component={Board} />
    </Route>;

export default routes;
