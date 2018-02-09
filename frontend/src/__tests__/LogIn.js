import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/login';
import Enzyme from 'enzyme';
import { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const cmp = mount(<Login users={[{email: test, password: 123}]} />)
})
