const mongoose = require('mongoose');

const {Schema}= mongoose;



const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        
    },
    verified:{
        type:Boolean,
        default:false
    },
    
    date:{
        type:Date,
        default:Date.now
    }
});
const User =  mongoose.model('user',userSchema);




module.exports = {User}