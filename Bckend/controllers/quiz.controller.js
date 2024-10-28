const QuizService = require('../services/quiz.service');
const Response = require('../helper/response');
const Messages = require('../constants/constMessage');

const createQuiz = async (req, res) => {
    try {
        const quizData = {
            ...req.body,
            createdBy: req.user.id // Ensure that req.user is correctly attached by middleware
        };
        const quiz = await QuizService.createQuiz(quizData);
        return Response.successResponse(res, quiz, Messages.quizCreated);
    } catch (error) {
        console.log(error);
        return Response.errorResponse(res, error); // Corrected error response
    }
};

const updateQuiz = async (req, res) => {
    try {
      const quizId = req.params.quizId;
      const updateData = req.body;
  
      // Update the quiz with the given ID using the provided data
      const updatedQuiz = await QuizService.updateQuiz(quizId, updateData);
  
      if (!updatedQuiz) {
        return Response.failResponse(res, Messages.quizNotFound, 404);
      }
  
      return Response.successResponse(res, updatedQuiz, Messages.quizUpdated);
    } catch (error) {
      console.error(error);
      return Response.errorResponse(res, error);
    }
  };
  

  const deleteQuiz = async (req, res) => {
    try {
      const quizId = req.params.quizId;
  
      // Delete the quiz with the given ID
      const deletedQuiz = await QuizService.deleteQuiz(quizId);
  
      if (!deletedQuiz) {
        return Response.failResponse(res, Messages.quizNotFound, 404);
      }
  
      return Response.successResponse(res, null, Messages.quizDeleted, 200);
    } catch (error) {
      console.error(error);
      return Response.errorResponse(res, error);
    }
  };
  
const getAllQuizzes = async (req, res) => {
    try {
        const filter = req.query; // e.g., filter by category, difficulty, status
        const quizzes = await QuizService.getAllQuizzes(filter);
        return Response.successResponse(res, quizzes, Messages.quizzesFetched);
    } catch (error) {
        console.log(error);
        return Response.errorResponse(res, error); // Corrected error response
    }
};

module.exports = {
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzes
};
