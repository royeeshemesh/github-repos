import React from 'react';
import {shallow,mount} from 'enzyme';
import App from 'src/App';

describe('App tests', () => {

  it('shallow renders without crashing', () => {
    shallow(<App/>);
  });

  it('renders without crashing', () => {
    mount(<App/>);
  });

  it('shallow renders common areas', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.container')).toHaveLength(1);
    expect(wrapper.find('h1').text()).toEqual('GitHub repositories search');
    expect(wrapper.find('p').text()).toEqual('This is a sample app to demonstrate v3 GitHub api for searching repositories');
    expect(wrapper.find('small').text()).toEqual('By Royee Shemesh');
  });

  it('configure routes', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('Route')).toHaveLength(2);
  })

});
