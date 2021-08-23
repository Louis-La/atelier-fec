import React from 'react';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ProductOverview from '../client/src/components/productDetails/OverviewMain.jsx';
import AddToCart from '../client/src/components/productDetails/eachComponent/AddToCart.jsx';
import StyleSelector from '../client/src/components/productDetails/eachComponent/StyleSelector.jsx';
import ProductDescription from '../client/src/components/productDetails/eachComponent/ProductDescription.jsx';
import ProductInformation from '../client/src/components/productDetails/eachComponent/ProductInformation.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('Basic test', () => {
  it('adds 1 + 2 to equal 3', () => {
    const sum = (a, b) => {
      return a + b;
    };
    expect(sum(1, 2)).toBe(3);
  });
});

// describe('Carousel', () => {
//   it('should be true that Carousel exists', () => {
//     const wrapper = shallow(<Carousel />);
//     expect(wrapper.find(Carousel)).toBeTruthy();
//   });
// });

describe('Each Component renders correctly', () => {
  // it('Carousel renders correctly', () => {
  //   const wrapper = shallow(<Carousel />);
  //   expect(wrapper).toMatchSnapshot();
  // });
  it('ProductInformation renders correctly', () => {
    const wrapper = shallow(<ProductInformation />);
    expect(wrapper).toMatchSnapshot();
  });
  it('ProductDescription renders correctly', () => {
    const wrapper = shallow(<ProductDescription />);
    expect(wrapper).toMatchSnapshot();
  });
  it('StyleSelector renders correctly', () => {
    const wrapper = shallow(<StyleSelector />);
    expect(wrapper).toMatchSnapshot();
  });
  it('AddToCart renders correctly', () => {
    const wrapper = shallow(<AddToCart />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('AddToCart button', () => {
  describe('when a user clicks the button', () => {
    it ('calls function to send data of items in cart', () => {
      const onButtonClick= jest.fn();
      const wrapper = shallow(
        <AddToCart
          onButtonClick={onButtonClick}
        />,
      );
      const button = wrapper.find('.addCart');
      button.simulate('click');

      expect(onButtonClick).toHaveBeenCalledTimes(1);
      expect(onButtonClick).toHaveBeenCalledWith(true);
    });
  });
});
