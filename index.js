const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/form-builder`);

app.use(bodyParser.json());

app.use('/', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

require('./models/Forms');
require('./routes/formRoutes')(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
});
