const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    created_at:{
        type:Date,
        default:Date.now
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;