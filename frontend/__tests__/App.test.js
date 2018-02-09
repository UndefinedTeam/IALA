import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});



it('changes border and background color of input to red when there is an error', () => {
    const mockSubmitHandler = jest.fn()
    const validationErrors = [
        {
            param: 'email',
            msg: "Is required."
        }
    ]
    const component = mount(<SignUp onSubmit={mockSubmitHandler} errors={validationErrors}/>)
    expect(component.find('#email-input.has-error').length).toBe(1)
})
