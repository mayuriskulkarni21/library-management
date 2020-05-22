const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    name: String,
    questionSet: Array,
})

mongoose.model('forms', formSchema);