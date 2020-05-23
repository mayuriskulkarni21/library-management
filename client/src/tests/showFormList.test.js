import React from 'react';
import { shallow } from 'enzyme';
import { ShowFormList } from '../components/showFormList';
import renderer from 'react-test-renderer';

describe('<ShowFormList />', () => {
    it('should `ShowFormList` component render correctly', () => {
        const component = renderer.create(<ShowFormList />).toJSON();
        expect(component).toMatchSnapshot();
    });

    it('should collect table data', () => {
        const form = [{
            questionSet: [],
            name: 'form name',
            created_at: new Date(),
            _id: 1
        }];
        let wrapper = shallow(<ShowFormList getMultiChoice={jest.fn()} formList={form} />);
        let instance = wrapper.instance();
        instance.renderTableData();
    })
});