import { call, put, takeEvery } from 'redux-saga/effects';
import { constants } from '../constants/index.js';
import { getForm, formList } from './actions.js';
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

function* getFormList(action) {
    try {
        let result = yield Axios.get(endpoints.FORM_LIST)
            .then(res => {
                return res.data;
            })
            .catch(e => {
                return e;
            })
        yield put(formList(result));
    } catch (e) {
        console.log("e", e);
        yield put(formList(e));
    }
}

function* mySaga() {
    yield takeEvery(constants.SAVE_FORM, postFormData);
    yield takeEvery(constants.GET_FORM_LIST, getFormList);
}

export default mySaga;