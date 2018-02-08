import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/login';
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

it('renders without crashing', () => {
  const cmp = mount(<Login users={[]} />)
})

// it("checks if clickHandler on", () =>{
//   const mockClickHandler = jest.fn()
//   const component = mount(<Login onClick={mockClickHandler}/>)
//   component.find('button#button').simulate('click', {button: 0})
//   expect(mockClickHandler.mock.calls.length).toBe(1)
// })
