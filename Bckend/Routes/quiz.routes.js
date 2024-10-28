const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quiz.controller');
const authMiddleWare = require('../Middleware/auth.middleware')


router.post('/admin/quiz',authMiddleWare.verifyUserToken,QuizController.createQuiz);

router.put('/admin/quiz/:quizId',authMiddleWare.verifyUserToken,QuizController.updateQuiz);


// Delete an existing quiz by ID
router.delete('/admin/quiz/:quizId', authMiddleWare.verifyUserToken, QuizController.deleteQuiz);

// Get all quizzes
router.get('/admin/quizzes', authMiddleWare.verifyUserToken, QuizController.getAllQuizzes);

module.exports = router;