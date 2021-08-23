import 'jsdom-global/register';
import React from 'react';

import { shallow, mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Reviews from '../client/src/components/ratingsReviews/ratings';
import Images from '../client/src/components/ratingsReviews/images';
import Stars from '../client/src/components/ratingsReviews/stars';
import RatingsBreakdown from '../client/src/components/ratingsReviews/ratingsBreakdown';

Enzyme.configure({ adapter: new Adapter() });

describe('Basic test', () => {
  it('adds 1 + 2 to equal 3', () => {
    const sum = (a, b) => {
      return a + b;
    };
    expect(sum(1, 2)).toBe(3);
  });
});



describe('Reviews',  () => {
    // const wrapper = mount(<Reviews />)
    //   expect(wrapper).toMatchSnapshot()
    test('renders', () => {
      const wrapper = shallow(<Reviews/>);
      expect(wrapper.exists()).toBe(true);
    })

});

describe('Images', () => {
  it('should be true that images component exists', () => {
    const initialProps = {images: ['www.google.com']}
    const wrapper =  mount(<Reviews><Images/></Reviews>  );
    const imagesElem = wrapper.find('Images');
    // expect(wrapper.find(Images)).toBeTruthy();
    expect(imagesElem).toBeTruthy();
    //now we want to test the props of images
    
  });
});
describe('Stars', () => {
  it('should be true that stars component exists', () => {
    const wrapper =  mount(<Reviews><Stars/></Reviews>  );
    const starsElem = wrapper.find('Stars');
    expect(starsElem).toBeTruthy();
  });
});
describe('RatingsBreakdown', () => {
  it('should be true that the ratingsbreakdown component exists', () => {
    const wrapper =  mount(<Reviews><RatingsBreakdown/></Reviews>  );
    const ratingsElem = wrapper.find('RatingsBreakdown');
    expect(ratingsElem).toBeTruthy();
  });
});

