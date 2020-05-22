import { call, put, takeEvery } from 'redux-saga/effects';
import { constants } from '../constants/index.js';
import { getForm } from './actions.js';
import { endpoints } from '../constants/endpoints.js';
import Axios from 'axios';
import '@babel/polyfill';

function* postFormData(action) {
    try {
        let result = yield Axios.post(endpoints.SAVE_FORM, action.data)
            .then(res => {
                return res.data;
            })
            .catch(e => {
                return e;
            })
        yield put(getForm(result));
    } catch (e) {
        console.log("e", e);
        yield put(getForm(e));
    }
}

function* mySaga() {
    yield takeEvery(constants.SAVE_FORM, postFormData);
}

export default mySaga;