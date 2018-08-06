import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';
import { withInfo } from '@storybook/addon-info';

import StackedPrices from '../ui/StackedPrices';

// Mock data
import Prices from '../mocks/prices.json';

const interpolationOptions = {
  stepAfter: 'stepAfter',
  stepBefore: 'stepBefore',
  step: 'step',
};

storiesOf('StackedPrices', module)
  .addDecorator(withKnobs)
  .add(
    'default',
    withInfo(`
      <p>This a graph with stacked areas. It has different interpolation rules for the steps.</p>
    `)(() => {
      const selectInterpolation = select('Interpolation', interpolationOptions, 'stepAfter');
      return (
        <StackedPrices
          data={Prices}
          interpolation={selectInterpolation}
        />
      );
    }),
  );

