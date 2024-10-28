const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    difficulty:{
        type:String,
        enum:['easy','medium','hard'],

    },
    questions:[
        question:{
            type:String,
            required:true,
        },
        options:[
            {
                type:String,
                required:true,
            }
        ],
        correctAnswer:{
            type:String,
            required:true
        }
    ],
    createdBy: 
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
})

module.exports=mongoose.model('Quiz',quizSchema)