import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import NavbarComponent from './components/NavBarComponent';
import { mount } from 'enzyme';

describe('<App />', () => {

    test('renders app', () => {

      const app = render(<App />);
      expect(app).toBeTruthy();

    });

    test('Renders NavBarComponent', () => {
      const wrapper = mount(<App />);
  
      expect(wrapper.find(NavbarComponent)).toHaveLength(1);
    })

});

