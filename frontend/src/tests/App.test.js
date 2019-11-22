import React from 'react';
import ReactDOM from 'react-dom';
import MessageApp from '../App'

import mockAxios from '../__mocks__/axios.js'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { mount } from 'enzyme'

Enzyme.configure({ adapter: new Adapter()})

describe('MessageApp', () => {
  beforeEach(function(){
    mockAxios.post.mockImplementation(() =>
    Promise.resolve({
      data: []
    }))

    mockAxios.get.mockImplementation(() =>
    Promise.resolve({
      data: []
    }));

  })

  afterEach(function(){
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MessageApp />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has textbox', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('textarea#message_box')).toBe(true);
  });

  it('has submit button', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('button#submit')).toBe(true);
  });

  it('has message list', () => {
    const component = mount(<MessageApp/>);
    expect(component.exists('ul#message_list')).toBe(true);
  });

  it('posts data on submit', () => {
    const component = mount(<MessageApp/>);
    component.find('textarea#message_box').simulate('change', { target: { value: 'Hello' } })
    component.find('form').simulate('submit')
    expect(mockAxios.post).toHaveBeenCalledWith("http://localhost:3001/message", {"content": "Hello"});
  });

  it('Loads data from api', () => {
    mount(<MessageApp />);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
  });

});