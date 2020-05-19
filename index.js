const express = require('express');
const moogoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

moogoose.Promise = global.Promise;
moogoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library-management');

app.use(bodyParser.json());

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`App  running on port ${PORT}`);
})