const mongoose = require('mongoose');

var Player = mongoose.model('player',{
    name:{type:String},
    joiningDate:{type:String},
    birthDate:{type:String},
    score:{type:String}
});
module.exports = {Player} ;