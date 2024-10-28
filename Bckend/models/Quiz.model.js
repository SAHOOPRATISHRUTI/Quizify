const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Sub-schema for questions
const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: [{
        type: String,
        required: true,
    }],
    correctAnswer: {
        type: String,
        required: true,
    }
});

// Main Quiz schema
const quizSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'], // Match case-sensitivity
        required: true
    },
    questions: [questionSchema], // Use the sub-schema for questions
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quiz', quizSchema);
