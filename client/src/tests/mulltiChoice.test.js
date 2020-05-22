import React from 'react';
import { shallow } from 'enzyme';
import DocumentInput from '../components/mulltiChoice';
import renderer from 'react-test-renderer';

describe('<DocumentInput />', () => {
    it('should `DocumentInput` component render correctly', () => {
        const component = renderer.create(<DocumentInput />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should update state for input change', () => {
        let wrapper = shallow(<DocumentInput getMultiChoice={jest.fn()} />);
        let instance = wrapper.instance();
        const e = {
            preventDefault: () => {
            },
            target: {
                name: 'unit testing',
                value: 'test'
            }
        };
        instance.handleChange(e);
        expect(wrapper.state('inputVal')).toEqual('test');
    })
});