const mongoose = require('mongoose');
const environment = require('../environment');
mongoose.Promise = global.Promise;
mongoose.connect(environment.database);
module.exports = {
    mongoose
}