const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EventSchema = new Schema({
    title : String,
    content : String,
    desc : String,
    start : {type : Date, default : Date.now()},
    end : {type : Date, default : Date.now()},
    ins_dt : {type : Date, default : Date.now()},
    upt_dt : {type : Date, default : Date.now()},
    id : String
})

module.exports = mongoose.model('event', EventSchema);