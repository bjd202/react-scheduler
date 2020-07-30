const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id : String,
    password : String,
    name : String,
    ins_dt : {type : Date, default : Date.now()}
})

module.exports = mongoose.model('user', UserSchema);