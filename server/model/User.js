const mongoose= require('mongoose');

var schema= new mongoose.Schema({
            firstname:{
                        type:String,
                        required:true
            },
            lastname:{
                        type:String,
                        required:true
            },
            email:{
                        type:String,
                        required:true
            },
            password:{
                        type:String,
                        required:true
            },
            date:{
                        type:Date,
                        default:Date.now
            },
            token:{
                        type:String
            }
            

});
const User=mongoose.model('User',schema);
module.exports=User;

