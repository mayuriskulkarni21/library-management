import { constants } from '../constants/index.js';

export const saveForm = (data) => ({
    type: constants.SAVE_FORM,
    data
});

export const getQuestionsSet = () => ({
    type: constants.SAVE_FORM,
});