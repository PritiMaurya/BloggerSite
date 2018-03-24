const {mongoose} = require('../db/mongoose');
const validate = require('mongoose-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var emailValidator =
    validate({
        validator: 'isEmail',
        message: "{VALUE} is not valid email"
    });
var passValidator = validate({
    validator: 'isLength',
    args: [8,16],
    message: "Password length should be 8 to 16"
})
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        trim: true
    },
    mobile:{
        type: String,
        trim: true
    },
    password:{
        type: String,
        trim: true
    },
    email:{
        type:  String,
        validate: emailValidator,
        trim: true
    },
    gender:{
        type: String,
        trim: true
    },
    pic:{
        type: String,
        trim: true
    },
    token: {
        type: String
    },
    isDelete:{
        type: Boolean,
        default: false
    }
});

var postSchema = new mongoose.Schema({
    status:{
        type: String,
        trim: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: ['User']
    },
    postImg:{
        type: String,
        trim: true
    },
    isDelete:{
        type: Boolean,
        default: false
    }
});


userSchema.methods.getToken= function () {
    //console.log("token data");
    user1 = this;
    token1 = jwt.sign(user1._id.toHexString(),"priti7878").toString();
    user1.token = token1;
    //console.log(user1.token);
    return user1.save().then(
        ()=>{
            return token1;
        }
    );
}


var User = mongoose.model('User', userSchema);
const Post = mongoose.model('post',postSchema);


module.exports ={
    User,
    Post
}

