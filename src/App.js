import React from 'react';

import RangePrices from './ui/RangePrices';
import StackedPrices from './ui/StackedPrices';

import { Prices } from './mocks/prices.json';

const App = props => (
  <React.Fragment>
    <RangePrices data={Prices} />
    <StackedPrices data={Prices} interpolation="afterStep" />
  </React.Fragment>
);

export default App;
