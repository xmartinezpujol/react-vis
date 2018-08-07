import React from 'react';
import { shallow } from 'enzyme';

import StackedPrices from '../ui/StackedPrices';

// Mock data
const Prices = {
  unprecio: [
    { '0-23': 0.123 },
  ],
  dosprecios: [
    { '0-13': 0.079 },
    { '14-23': 0.155 },
  ],
  '3.0a': [
    { '0-7': 0.055 },
    { '8-12': 0.082 },
    { '13-16': 0.19 },
    { '17-20': 0.078 },
    { '21-23': 0.045 },
  ],
};

describe('StackedPrices', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <StackedPrices
        data={Prices}
        interpolation="stepAfter"
      />,
    );
  });
  it('StackedPrices renders correctly', () => {
    expect(wrapper.render()).toMatchSnapshot();
  });
});
