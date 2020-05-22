import { constants } from '../../constants/index.js';

export default (state = {}, action) => {
    switch (action.type) {
        case constants.GET_FORM:
            return {
                formData: action.data
            }
        default:
            return state
    }
}