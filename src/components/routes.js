import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router';

import Board from 'components/board';
import Welcome from 'components/welcome';
import About from 'components/about';

const routes =
    <Route path="/" >
        <IndexRoute component={Board} />
        <Route path="about" component={About} />
    </Route>;

export default routes;
