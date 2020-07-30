var express = require('express');
var router = express.Router();

var UserSchema = require('../models/UserSchema');

router.post('/login', function(req, res) {

    console.dir(req.body)

    UserSchema.findOne({id : req.body.id, password : req.body.password}, function (err, user) {
        if(err){
            res.json({success : false})
            return;
        }

        console.dir(user)

        if(user){
            req.session.id = user.id
            req.session.name = user.name
            res.json({success : true, data : user})
        }else{
            res.json({success : false})
        }
        
    })
});

router.post('/logout', function(req, res) {
    req.session.id = undefined;
    req.session.name = undefined;
    res.json({success : true})
});

router.post('/loginCheck', function (req, res) {
    res.json({session : {id : req.session.id, name : req.session.name}})
})

module.exports = router;