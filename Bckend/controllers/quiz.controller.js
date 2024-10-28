const QuizService = require('../services/quiz.service')
const Response = require('../helper/response')
const Messages = require('../constants/constMessage')


const createQuiz = async(req,res)=>{
    try{
        const quizData ={
            ...req.body,
            createdBy:req.user.id
        };
        const quiz = await QuizService.createQuiz(quizData);
        return Response.successResponse(res,quiz,Messages.quizCreated)
    }
    catch(error){
        console.log(error);
        return Response.errorResponse(res.error);
    }
}

const updateQuiz = async(req,res)=>{
    try{
        const quizId = req.params.quizId;
        const quiz = await QuizService.updateQuiz(quizId.req.body);
        if(!quiz) return Response.failResponse(req,null,Messages.quizNotFound,404);
        return Response.successResponse(res, quiz, Messages.quizUpdated);
    }
    catch(error){
        console.log(error);
        return Response.errorResponse(res.error);
    }
}

const deleteQuiz = async(req,res)=>{
    try{
        const quizId = req.params.quizId;
        const quiz = await QuizService.deleteQuiz(quizId);
        if(!quiz) return Response.failResponse(req,null,Messages.quizDeleted,404);
        return Response.successResponse(res, null, Messages.quizDeleted, 200);

    }catch(error){
        console.log(error);
        return Response.errorResponse(res.error);
    }
}
const getAllQuizzes=async(req,res)=>{
    try {
        const filter = req.query; // e.g., filter by category, difficulty
        const quizzes = await QuizService.getAllQuizzes(filter);
        return Response.successResponse(res, quizzes, Messages.quizzesFetched);
    }catch(error){
        console.log(error);
        return Response.errorResponse(res.error);
    }
}


module.exports={
    createQuiz,
    updateQuiz,
    deleteQuiz,
    getAllQuizzes
}