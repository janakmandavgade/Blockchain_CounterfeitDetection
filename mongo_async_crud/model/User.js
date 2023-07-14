const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2001
        },
        Editor: Number,
        Admin: Number,
        Manufacturer: Number,
        Retailer: Number
    },
    password: {
        type: String,
        required: true
    },
    companyname: {
        type: String
    },
    nameofmanufacturer: {
        type:String
    },
    addressofcompany: {
        type:String
    },
    emailid: {
        type:String
    },
    metamaskacc: {
        type:String
    },
    retid: {
        type:String
    },
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);