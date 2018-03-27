var {Post} = require('../model/User');

module.exports ={
    getPost: (req,res)=>{
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
    },
    addPost:  (req,res)=>{
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
    },
    get_all_post: (req,res)=>{
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
    },
    deletePost: (req,res)=>{
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
    }
}
