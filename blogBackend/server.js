// grab dependency
const express           = require("express");
const bodyParser        = require("body-parser");
const environment  		    = require('./app/environment');

var app = express();
// var router = express.Router()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers',"content-type, cache,X-Custom-header,token");
    res.header("AccessControlAllowMethods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Access-Control-Expose-Headers, X-Requested-With, Content-Type, Accept,token");
    next();
});

app.use(require('./app/routes'));

//start server
app.listen(environment.port,()=>{
    console.log('App listening  on HTTP://localhost:'+environment.port);
});