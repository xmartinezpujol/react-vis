import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import RangePrices from '../ui/RangePrices';

// Mock data
import Prices from '../mocks/prices.json';

storiesOf('RangePrices', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo(`
      <p>This a graph with a range of prices for each plan.</p>
    `)(() => (
      <RangePrices
        data={Prices}
      />
    )),
  );

