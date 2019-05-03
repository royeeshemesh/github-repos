/* eslint-env jest */

import {shallow} from 'enzyme';
import React from 'react';

import App from 'pages/_app.js';

const Component = () => {
  return (
    <div/>
  )
};

describe('With Enzyme', () => {
  it('App shows correctly', () => {
    const app = shallow(<App Component={Component}/>);

    expect(app.find('h1').text()).toEqual('GitHub repositories search');
    expect(app.find('p').text()).toEqual('This is a sample app to demonstrate v3 GitHub api for searching repositories');
    expect(app.find('small').text()).toEqual('By Royee Shemesh');
  });
});