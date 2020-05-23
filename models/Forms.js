const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    name: String,
    questionSet: Array,
    created_at: Date
})

mongoose.model('forms', formSchema);