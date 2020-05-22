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

});

