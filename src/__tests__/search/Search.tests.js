import React from 'react';
import {shallow, render} from 'enzyme';
import ConnectedSearch, {Search} from 'src/search/Search';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';

describe('Search tests', () => {
  const initialState = {repositories: {}};
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);

  });

  it('shallow renders without crashing', () => {
    const wrapper = shallow(<ConnectedSearch store={store}/>);
    expect(wrapper.props('onSelectRepository')).toBeDefined();
  });

  it('shallow provider renders without crashing', () => {
    const wrapper = shallow(<Provider store={store}><ConnectedSearch/></Provider>);
    expect(wrapper.props('onSelectRepository')).toBeDefined();
  });

  it('shallow renders Search without crashing', () => {
    const wrapper = shallow(<Search/>);
    expect(wrapper.find('.row')).toHaveLength(1);
  });


});
