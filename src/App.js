import React from 'react';

import {
  Switch,
  Route,
  withRouter,
} from 'react-router-dom';

import RangePrices from './ui/RangePrices';
import StackedPrices from './ui/StackedPrices';

import Prices from './mocks/prices.json';

const App = () => (
  <React.Fragment>
    <Switch>
      <Route
        path="/ranges"
        component={() => <RangePrices data={Prices} />}
      />
      <Route
        path="/"
        component={() => <StackedPrices data={Prices} interpolation="stepAfter" />}
      />
    </Switch>
  </React.Fragment>
);

export default withRouter(App);
