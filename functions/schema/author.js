    const mongoose = require('mongoose');
    const {Schema} = mongoose;

    const authorSchema = new Schema({
        title:{
            type:String,
            required:true
        },
        author:{
            type:String,
            required:true
        },
        message:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }


    });

    authorSchema.pre('save',function(next){
    next();
    });

    module.exports = authorSchema;