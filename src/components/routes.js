import React, {Component} from 'react';
import {Route, IndexRoute} from 'react-router';

import Layout from 'components/layout';
import Welcome from 'components/welcome';
import About from 'components/about';

const routes =
    <Route path="/" component={Layout}>
        <IndexRoute component={Welcome} />
        <Route path="about" component={About} />
    </Route>;

export default routes;
