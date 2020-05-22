import React from 'react';
import { shallow } from 'enzyme';
import { CreateForm } from '../components/createForm';
import renderer from 'react-test-renderer';

describe('<CreateForm />', () => {
    let wrapper, instance, saveForm, save;

    beforeEach(() => {
        saveForm = (data) => { save = data }
        wrapper = shallow(<CreateForm saveForm={saveForm} />);
        instance = wrapper.instance();
    });

    it('should `CreateForm` component render correctly', () => {
        const component = renderer.create(<CreateForm />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should update state on toggle', () => {
        wrapper.setState({ modal: true });
        instance.toggle();
        expect(wrapper.state('modal')).toEqual(false);
    });

    it('should collect questions set and update state accordingly', () => {
        wrapper.setState({ questionSet: [] });
        const questionSet = {
            question: 'test question',
            ansType: 'Text'
        };
        instance.getQuestionSet(questionSet);
        expect(wrapper.state('questionSet')[0].question).toEqual('test question');
    });

    it('should dispatch action to save form data', () => {
        instance.save();
        expect(save.name).toEqual('');
    });

    it('should update component state on input change', () => {
        const e = {
            preventDefault: () => {
            },
            target: {
                value: 'test'
            }
        };
        instance.handleChange(e);
        expect(wrapper.state('name')).toEqual('test');
    });
});