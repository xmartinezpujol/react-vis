import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, select } from '@storybook/addon-knobs';

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
  .add('default', () => {
    const selectInterpolation = select('Interpolation', interpolationOptions, 'stepAfter');
    return (
      <StackedPrices
        data={Prices}
        interpolation={selectInterpolation}
      />
    );
  });

