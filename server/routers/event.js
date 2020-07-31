var express = require('express');
var router = express.Router();

var EventSchema = require('../models/EventSchema');
const { findOneAndUpdate } = require('../models/EventSchema');

router.post('/list', function(req, res) {

    EventSchema.find({id : req.body.id}, (err, events) => {
        if(err){
            res.json({success : false})
            return
        }

        if(events.length === 0){
            res.json({success : false})
            return
        }else{
            res.json({success : true, events : events})
        }
    })
});

router.post('/:id', function(req, res) {
    
});

router.put('/create', function(req, res) {

    const event = new EventSchema(req.body)

    event.save((err, event) => {
        if(err){
            res.json({success : false})
            return
        }

        res.json({success : true, event : event})
    })
});

router.patch('/update/:id', function (req, res) {
    console.log(req.params.id)
    console.dir(req.body)

    EventSchema.findOneAndUpdate({_id : req.params.id}, {
        title : req.body.title,
        content : req.body.content,
        desc : req.body.desc,
        start : req.body.start,
        end : req.body.end,
        upt_dt : Date.now()
    }, (err, event) => {
        if(err) return res.json({success : false})

        res.json({success : true, event : event})
    })
})

router.post('/delete/:id', function (req, res) {
    
})

module.exports = router;