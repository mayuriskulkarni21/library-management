import { constants } from '../constants/index.js';

export const saveForm = (data) => ({
    type: constants.SAVE_FORM,
    data
});

export const getForm = (data) => ({
    type: constants.GET_FORM,
    data
});

export const getFormList = () => ({
    type: constants.GET_FORM_LIST,
});

export const formList = (data) => ({
    type: constants.FORM_LIST,
    data
})