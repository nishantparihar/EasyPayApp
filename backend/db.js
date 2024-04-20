const mongoose = require("mongoose");
const { MongoString } = require("./config")

mongoose.connect(MongoString)

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

const userModel = mongoose.model("Users", userSchema);




const accountSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "userModel",
        required: true
    },
    balance: {
        type: mongoose.Number,
        required: true
    }
});


const accountModel = mongoose.model('Account', accountSchema);

module.exports = {
    userModel,
    accountModel
}