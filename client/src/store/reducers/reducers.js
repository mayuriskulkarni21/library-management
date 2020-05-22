import { constants } from '../../constants/index.js';

export default (state = {}, action) => {
    switch (action.type) {
        case constants.SIMPLE_ACTION:
            return {
                result: action.payload
            }
        default:
            return state
    }
}