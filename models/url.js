const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    actualURL : {
        type : String,
        required : true
    },
    shortURL : {
        type : String,
        required : true,
        unique : true
    },
    clicks : {
        type : Number,
        default : 0
    }
})

const URL = mongoose.model('URL',urlSchema);

module.exports = URL;