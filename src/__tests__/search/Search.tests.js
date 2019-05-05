import React from 'react';
import {shallow} from 'enzyme';
import Search from 'src/search/Search';

describe('Search tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Search onSelectRepository={()=>{}}/>);
  });

  it('shallow renders without crashing', () => {
    expect(wrapper.props('onSelectRepository')).toBeDefined();
  });

  it('shallow renders Search without crashing', () => {
    expect(wrapper.find('.row')).toHaveLength(1);
  });


});
