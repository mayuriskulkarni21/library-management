const mongoose = require('mongoose');
const { Schema } = mongoose;

const formSchema = new Schema({
    name: String,
    description: String,
})

mongoose.model('forms', formSchema);