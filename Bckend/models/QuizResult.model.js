const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quizResultSchema = new Schema({

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: tru
    },
    score: {
        type: Number,
        required: true
    },
    totalQuestions: {
        type: Number,
        required: true
    },
    details: [
        {
            questionId: {
                type: mongoose.Schema.Types.ObjectId,
                required: true
            },
            selectedOption: {
                type: String
            },
            correctAnswer: {
                type: String
            },
            isCorrect: {
                type: Boolean
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('QuizResult', quizResultSchema);