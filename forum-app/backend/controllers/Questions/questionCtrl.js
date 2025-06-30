import asyncHandler from "../../middlewares/asyncHandler.js";
import questionMdl from "../../models/questionMdl.js";

export const allQuestions = (req, res) =>{
    res.status(200).json('all questions');
}

export const detailQuestion = () =>{}

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
