import asyncHandler from "../../middlewares/asyncHandler.js";
import questionMdl from "../../models/questionMdl.js";
import mongoose from 'mongoose';

export const allQuestions = asyncHandler(async(req, res) =>{
    const getQuestions = await questionMdl.find();
    
    res.status(200).json({
        success: true,
        message: 'Get all questions successfully.',
        data: getQuestions
    });
})

export const detailQuestion = asyncHandler(async(req, res) =>{
    const questionId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(questionId)) {
        return res.status(404).json({
            success: false,
            message: 'Question not found.'
        });
    }

    const detailQuestion = await questionMdl.findById(questionId);

    if(!detailQuestion) {
        return res.status(404).json({
            success: false,
            message: 'Question not found.'
        });
    }

    res.status(200).json({
        success: true,
        message: 'Get detail question successfully.',
        data: detailQuestion
    });
})

export const storeQuestion = asyncHandler(async(req, res) =>{
    const { title, content, category} = req.body;

    const save = await questionMdl.create({
        title,
        content,
        category,
        userId: req.user._id
    })

    return res.status(201).json({
        success: true,
        message: 'Question created successfully.'
    })
})

export const updateQuestion = () =>{}

export const destroyQuestion = () =>{}
