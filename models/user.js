const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    fname:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    emailid:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    password:String
}) ;
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("User",UserSchema);