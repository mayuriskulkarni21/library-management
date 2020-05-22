import React from 'react';
import { shallow } from 'enzyme';
import App from '../app.js';

describe('App', () => {
    it('should render `App` component correctly', () => {
        const component = shallow(<App />);
        expect(component).toMatchSnapshot();
    });
});