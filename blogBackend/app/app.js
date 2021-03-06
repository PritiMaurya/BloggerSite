var express = require('express');
var bodyParser = require('body-parser');
var {User} = require('./model/User');
var bcrypt = require('bcrypt');
var {Post} = require('./model/User');
var cors = require('cors');


app = express();
app.use(cors());


app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:4200");
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Expose-Headers',"content-type, cache,X-Custom-header,acesstoken");
    res.header("AccessControlAllowMethods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers,Origin,Access-Control-Expose-Headers, X-Requested-With, Content-Type, Accept,acesstoken");
    next();
});

app.use(session({ secret: 'priti123', resave: true, saveUninitialized: true}));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));




var token;


passport.use('login', new localStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback: true},
    (req,email,password,done)=>{
    User.findOne({email:email},(err,user)=>{
        if(err)
        {
            console.log(err);
            return
        }
        if(!user)
        {
            console.log("User is not exists");
            return done(null,false);
        }
        if(user)
        {
            if(!validPassword(user,password))
            {
                console.log("password is invalid");
                return done(null,false);
            }
            console.log("Login Successful");
            user.getToken();
            return done(null, user);
        }
    })

}));

app.get('/home',(req,res)=>{
    console.log('success');
    console.log(req.isAuthenticated());
    res.send(" success");
});

app.get('/fail',(req,res)=>{
    res.send(" Failed");
});


passport.use('signup',new localStrategy({
        usernameField : 'email',
        passwordField : 'password',
    passReqToCallback: true
}, (req,email,password,done) =>{
        User.findOne({email: email}, (err, user) => {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (user) {
                console.log("User is already exists");
                return done(null, false);
            }
            else {
                var userdata = new User({
                    name: req.body.name,
                    mobile: req.body.mob,
                    password: createHash(password),
                    email: email,
                    pic: req.body.pic,
                    gender: req.body.gen
                });
                userdata.save(function (err) {
                    if (err) {
                        console.log('Error in Saving user: ' + err);
                        throw err;
                    }
                    var token = userdata.getToken();
                    if (token) {
                        console.log("Registration Successful")
                        return done(null, userdata);
                    }
                    else {
                        console.log("token err");
                    }
                });
            }
        })
})
);


app.post('/signup', function(req, res, next) {
    passport.authenticate('signup', function(err, user) {
        if (!user) { return res.send(null); }
        if(user){
            return res.send(user);
        }
    })(req, res, next);
});

app.get('/find',(req,res)=>{
   User.find().then(
       (data)=>{
           res.json(data);
       }
   )
});

app.get('/check',(req,res)=>{
    token1 = req.query.token;
    //console.log('token', token1);
    User.find({token:token1},{token:1, _id: 0}).then(
        (data)=>{
            //console.log(data);
            res.json(data);
        }
    )
});

app.get('/getData',(req,res)=>{
    token1 = req.query.token;
    //console.log('token', token1);
    User.find({token: token1}).then(
        (data)=>{
            //console.log(data);
            res.json(data);
        }
    )
});


app.get('/index',(req,res) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/profile',isLoggedIn,function(req,res){
    console.log("profile");
    res.send('Profile');
});



app.post('/addPost', (req,res)=>{
    var newPost = new Post({
        status: req.body.status,
        postImg: req.body.img,
        userId: req.body.id
    });
    newPost.save().then(
        (doc)=>{
            res.send(doc);
        },
        (err)=>{
            res.status(404).send(err);
        }
    )
});

app.get('/getPost',(req,res)=>{
    var id = req.query.id;
    Post.find({userId:id, isDelete:false}).then(
        (data)=>{
            console.log('All post data');
            res.send(data);
        },
        (err)=>{
            res.status(404).send(err);
        }
    );
});

app.get('/deletePost',(req,res)=>{
    var id = req.query.id;
    var data = {isDelete: true};
    Post.findByIdAndUpdate({_id:id},{$set: data}).then(
        (data)=>{
            console.log('All post data');
            res.send(data);
        },
        (err)=>{
            res.status(404).send(err);
        }
    )
});

app.post('/editUser', (req,res)=>{
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
   )
});


app.get('/',(req,res)=>{
    res.send("home");
});


app.listen(3001);



//https://medium.com/@nohkachi/local-authentication-with-express-4-x-and-passport-js-745eba47076d
// {
//     "email": "priti@gmail.com",
//     "password": "12345678",
//     "mobile": "1234567893",
//     "gender":"Female",
//     "name":"Pooja Maurya",
//     "pic": "dsdfdfdff"
// }





