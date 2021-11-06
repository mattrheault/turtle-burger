import React from 'react';
import { Route } from 'react-router';
import { baseRoute } from './constants/routes';
import Application from './containers/Application';

export default (
  <Route path={baseRoute}>
    <Route component={Application} />
  </Route>
);
