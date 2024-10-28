const express = require('express');
const router = express.Router();
const authRouter = require('../Routes/auth.routes');
const quizRouter = require('../Routes/quiz.routes');


// Use individual routers
router.use('/auth', authRouter);
router.use('/quiz', quizRouter);

module.exports = router;