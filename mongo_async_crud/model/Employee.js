const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    // firstname: {
    //     type: String,
    //     required: true
    // },
    // lastname: {
    //     type: String,
    //     required: true
    // },
    
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
});

module.exports = mongoose.model('Employee', employeeSchema);