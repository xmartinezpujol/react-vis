import React from 'react';

import { storiesOf } from '@storybook/react';
import { withKnobs, text, boolean, select, number } from '@storybook/addon-knobs';

import RangePrices from '../ui/RangePrices';

// Mock data
import Prices from '../mocks/prices.json';

import { COLOR_PALETTE } from '../ui/Constants';

const categories = Object.keys(Prices);

const optionsTemplate = {
  login: 'facebook',
  default: 'default',
  outlined: 'outlined',
  link: 'link',
};
const optionsBorder = {
  night: 'night',
  consumer: 'consumer',
  business: 'business',
  positive: 'positive',
  temporary: 'temporary',
  negative: 'negative',
};

storiesOf('RangePrices', module)
  .addDecorator(withKnobs)
  .add('default', () => {
    const defaultTeamplate = 'default';
    const defaultborderColor = 'black';

    const label = 'Theme';
    const label2 = 'Border Color';

    const template = select(label, optionsTemplate, defaultTeamplate);
    const borderColor = select(label2, optionsBorder, defaultborderColor);

    return(
      <RangePrices
        categories={categories.reverse()}
      />
    );
  });

