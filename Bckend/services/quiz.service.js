const Quiz = require('../models/Quiz.model')


const createQuiz = async (quizData) => {
    const newQuiz = new Quiz(quizData);
    return await newQuiz.save();
}

const updateQuiz = async (quizId, quizData) => {
    return await Quiz.findByIdAndUpdate(quizId, quizData, { new: true })
}

const deleteQuiz = async (quizId) => {
    return await Quiz.findByIdAndDelete(quizId);
}

const getAllQuizzes = async(filter = {}) => {
    return await Quiz.find(filter);
};





module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzes
}