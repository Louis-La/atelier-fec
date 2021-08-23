import React from 'react';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductOverview from '../client/src/components/productDetails/products.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Basic test', () => {
  it('adds 1 + 2 to equal 3', () => {
    const sum = (a, b) => {
      return a + b;
    };
    expect(sum(1, 2)).toBe(3);
  });
});

describe('ProductOverview', () => {
  it('should be true that ProductOverview exists', () => {
    const wrapper = shallow(<ProductOverview />);
    expect(wrapper.find(ProductOverview)).toBeTruthy();
  });
});
