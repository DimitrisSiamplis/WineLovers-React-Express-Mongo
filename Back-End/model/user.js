
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    
    FirstName: { type: String , required: true } ,
    LastName: { type: String , required: true } ,
    Address: { type: String , required: true } ,
    Number: { type: String , required: true } ,
    Gender: { type: String , required: true } ,
    Mobile: { type: Number , required: true } ,
    Email: {type: String , required: true , unique: true  } , 
    Password: { type: String , required: true } ,
    Birthday: { type: Date , required: true },
    Age: { type: String , required: true } ,

}, 
    {collection: 'user'}
)


const model = mongoose.model('UserSchema' , UserSchema)

module.exports = model