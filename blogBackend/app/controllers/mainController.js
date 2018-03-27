var {mongoose} = require('../db/mongoose');
var {User} = require('../model/User');
var bcrypt = require('bcrypt');

module.exports = {
    register: (req, res) => {
        User.findOne({email: req.body.email}, (err, user) => {
            if (err) {
                console.log(err);
                return res.send(null);
            }
            if (user) {
                console.log("User is already exists");
                return res.send('exists');
            }
            else {
                var userdata = new User({
                    name: req.body.name,
                    mobile: req.body.mob,
                    password: createHash(req.body.password),
                    email: req.body.email,
                    pic: req.body.pic,
                    gender: req.body.gen
                });
                userdata.save(function (err) {
                    if (err) {
                        console.log("Failed to Add Record")
                        return res.send(null);
                    }
                    var token = userdata.getToken();
                    if (token) {
                        console.log("Record Successfully Added");
                        return res.send(userdata);
                    }
                    else {
                        console.log("token err");
                        return res.send(null);
                    }
                });
            }
        })
    },
    login_check: (req, res) =>{
        User.findOne({email: req.body.email}, (err, user)=>{
           if(err){
               console.log('invalid email');
               res.send(null);
           }else
           {
               if(!validPassword(user,req.body.password)){
                   console.log('invalid password');
                   res.send(null);
               }
               else
               {
                   console.log("Login successfully");
                   user.getToken();
                   res.set('token', user.token);
                   res.send(user);
               }
           }
        });
    },
    find: (req,res)=>{
        User.find().then(
            (data)=>{
                res.json(data);
            }
        );
    },
    checkToken: (req,res)=>{
        console.log("check call");
        token1 = req.query.token;
        User.find({token:token1},{token:1, _id: 0}).then(
            (data)=>{
                console.log("check call", data);
                res.json(data);
            }
        );
    },
    profileData: (req,res)=>{
        token1 = req.query.token;
        // console.log('token', token1);
        User.find({token: token1}).then(
            (data)=>{
                console.log("profiledata");
                // console.log(data);
                res.send(data);
            }
        );
    },
    change_password: (req, res) => {
        var countParam = Object.keys(req.query).length;
        if (countParam > 0) {
            Users.find({})
                .where("_id")
                .equals(req.query.user_id)
                .exec((err, success) => {
                    if (err) {
                        var response = {
                            status: 500,
                            msg: "Old Password does not match with Database"
                        };
                        return res.send(response);
                    } else {
                        if (success.length == 1) {
                            var oldpassword = success[0]["password"];
                            if (oldpassword == req.query.oldpassword) {
                                data = {
                                    password: req.query.newpassword
                                };
                                var where = { _id: req.query.user_id };
                                var newvalues = { $set: data };
                                Users.updateOne(where, newvalues)
                                    .then(data => {
                                        var response = {
                                            status: 200,
                                            msg: "Password changed successfully"
                                        };
                                        return res.send(response);
                                    })
                                    .then(err => {
                                        var response = {
                                            status: 500,
                                            msg: "Password not changed successfully"
                                        };
                                        return res.send(response);
                                    });
                            }
                            else
                            {
                                var response = {
                                    status: 500,
                                    msg: "Old Password does not match with Database"
                                };
                                return res.send(response);
                            }
                        }
                        else
                        {
                            var response = {
                                status: 500,
                                msg: "Old Password does not match with Database"
                            };
                            return res.send(response);
                        }
                    }
                });
        }
        else{
            var response = {
                status: 500,
                msg: "Please Provide Paramater"
            };
            res.send(response);
        }
    },




    create_artical: (req, res) => {
        var countParam = Object.keys(req.query).length;
        if (countParam > 0) {
            var data = new Artical({
                title: req.query.title,
                author: req.query.author,
                description: req.query.description
            });
            data.save(function(err, success) {
                if (err) {
                    var response = {
                        status: 500,
                        msg: "Artical Failed Added"
                    };
                    res.send(response);
                } else {
                    var response = {
                        status: 200,
                        msg: "Artical Successfully Added"
                    };
                    res.send(response);
                }
            });
        } else {
            var response = {
                status: 500,
                msg: "Please Provide Paramater"
            };
            res.send(response);
        }
    },

    get_artical: (req, res) => {
        var countParam = Object.keys(req.query).length;
        if (countParam > 0) {
            Artical.findOne({ _id: req.query.artical_id })
                .then(data => {
                    var response = {
                        status: 200,
                        msg: "Record found",
                        data: data
                    };
                    return res.send(response);
                })
                .then(err => {
                    var response = {
                        status: 500,
                        msg: "No Record found"
                    };
                    return res.send(response);
                });
        } else {
            var response = {
                status: 500,
                msg: "Please Provide Paramater"
            };
            return res.send(response);
        }
    },

    update_artical: (req, res) => {
        var countParam = Object.keys(req.query).length;
        if (countParam != 0) {
            data = {
                title: req.query.title,
                author: req.query.author,
                description: req.query.description
            };
            var where = { _id: req.query.artical_id };
            var newvalues = { $set: data };
            Artical.updateOne(where, newvalues)
                .then(data => {
                    var response = {
                        status: 200,
                        msg: "Password changed successfully"
                    };
                    return res.send(response);
                })
                .then(err => {
                    var response = {
                        status: 500,
                        msg: "Password not changed successfully"
                    };
                    return res.send(response);
                });
        } else {
            var response = {
                status: 500,
                msg: "Please Provide Paramater"
            };
            return res.send(response);
        }
    },
    editUser: (req,res)=>{
    var id= req.query.id;
    var data = { name: req.body.name,
        mobile: req.body.mobile,
        pic: req.body.pic};
    User.findByIdAndUpdate({_id:id},{$set: data}).then(
        (data)=>{
            console.log('update data');
            res.send(data);
        },
        (err)=>{
            res.send(err);
        }
    );
    },
    forgot_password: (req, res) => {
        var countParam = Object.keys(req.query).length;
        if (countParam > 0) {
            Users.findOne({ email: req.query.email })
                .then(data => {
                    var response = {
                        status: 200,
                        msg: "Record found",
                        data: data
                    };
                    return res.send(response);
                })
                .then(err => {
                    var response = {
                        status: 500,
                        msg: "No Record found"
                    };
                    return res.send(response);
                });
        } else {
            var response = {
                status: 500,
                msg: "Please Provide Paramater"
            };
            return res.send(response);
        }
    }
};

validPassword =  (user,password)=> {
    return bcrypt.compareSync(password,user.password);
}


createHash = (password)=>{
    return bcrypt.hashSync(password,bcrypt.genSaltSync(10),null);
}

