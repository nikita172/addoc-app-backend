const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
        ref:"User"
    },
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    doc:{
        type:Array,
        require:true,
    }
},{timestamps:true});

module.exports= mongoose.model("Document",documentSchema)