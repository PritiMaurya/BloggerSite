var jwt = require('jsonwebtoken');
var environment = require('../environment');

module.exports = (req,res,next)=>{
    var token = req.headers['token'];
    console.log(token);
    if(token){
        jwt.verify(token, environment.secret, (err, data)=>{
            if(err){
                return res.status(401).json({ message: err.message });
            }else{
                // console.log(data);
                next();
            }
        });
    }
    else{
        return res.status(401).json({
            message: 'Unauthorized access'
        });
    }
}