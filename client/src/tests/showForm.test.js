import React from 'react';
import { shallow } from 'enzyme';
import ShowWholeForm from '../components/showForm';
import renderer from 'react-test-renderer';

describe('<ShowWholeForm />', () => {

    it('should `ShowWholeForm` component render correctly', () => {
        let history = {
            location: { pathname: '/' }
        }
        const component = renderer.create(<ShowWholeForm history={history} />).toJSON();
        expect(component).toMatchSnapshot();
    });
});