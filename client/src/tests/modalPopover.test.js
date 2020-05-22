import React from 'react';
import { shallow } from 'enzyme';
import ModalPopover from '../components/modalPopover';
import renderer from 'react-test-renderer';

describe('<ModalPopover />', () => {
    let wrapper, instance, saveForm, save;

    beforeEach(() => {
        saveForm = (data) => { save = data }
        wrapper = shallow(<ModalPopover getQuestion={jest.fn()} toggle={jest.fn()} />);
        instance = wrapper.instance();
    });

    it('should `ModalPopover` component render correctly', () => {
        const component = renderer.create(<ModalPopover />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should update state on toggle', () => {
        wrapper.setState({ dropdownOpen: true });
        instance.toggleDropdown();
        expect(wrapper.state('dropdownOpen')).toEqual(false);
    });

    it('should collect all the choices for multichoice and update components state', () => {
        const e = {
            preventDefault: () => {
            },
            target: {
                name: 'name',
                value: 'test'
            }
        };
        instance.getMultiChoice(e);
        expect(wrapper.state('choices').name).toEqual('test');
    });

    it('should add new record on button click', () => {
        wrapper.setState({ multichoice: [] });
        instance.add();
        expect(wrapper.state('multichoice').length).toEqual(1);
    });

    it('should collect question set and update set', () => {
        const e = {
            preventDefault: () => {
            }
        };
        instance.handleSubmit(e);
        expect(wrapper.state('questionSet').question).toEqual('');
    });

    it('should collect selected dropdown value and update components state', () => {
        const e = 'text';
        instance.handleChange(e);
        expect(wrapper.state('selectedType')).toEqual('text');
    });

    it('should collect question text and update components state', () => {
        const e = {
            preventDefault: () => {
            },
            target: { value: 'test' }
        };
        instance.handleChange(e);
        expect(wrapper.state('questionSet').question).toEqual('test');
    });
});