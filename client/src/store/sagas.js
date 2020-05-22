import { call, put, takeEvery } from 'redux-saga/effects';
import { constants } from '../constants/index.js';
import Axios from 'axios';
import '@babel/polyfill';

function* fetchHeadlines(action) {
    console.log("into sagas")
    try {
        // yield put({ type: SAVE_FORM, headlines })
        Axios.post('http://localhost:5000/api/create', action.data);
        console.log("action in saga: ", action.data, { headers: { "Content-Type": "application/json" } })
    } catch (e) {
        console.log("e", e)
        // yield put({ type: HEADLINES_FETCH_FAILED, message: e.message })
    }
}

function* mySaga() {
    yield takeEvery(constants.SAVE_FORM, fetchHeadlines);
}

export default mySaga;