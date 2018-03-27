const express     = require("express"),
    router          = express.Router(),
    mainController  = require("./controllers/mainController"),
    auth = require('./middleware/auth'),
    postController  = require("./controllers/controllerPost");

    module.exports    = router;

router.post('/signup', mainController.register);
router.post('/login', mainController.login_check);
router.post('/find', auth, mainController.find);
router.post('/editUser', mainController.editUser);
router.get('/check', mainController.checkToken);
router.get('/getData', mainController.profileData);
router.get('/getPost', postController.get_all_post);
router.post('/addPost', postController.addPost);
router.get('getPost', postController.getPost);
router.get('/deletePost', postController.deletePost);
