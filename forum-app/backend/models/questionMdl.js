import mongoose from 'mongoose';


const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required.'],
        unique: true
    },
    content: {
        type: String,
        required: [true, 'content is required.']
    },
    category: {
        type: String,
        enum: ['Backend', 'Frontend', 'DevOps', 'UI/UX'],
        required: [true, 'category is required.'],
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: ['true', 'user id is required.']
    },
    countVote: {
        type: Number,
        default: 0
    }
},{
    timestamps: true,
    collection: 'questions'
});

const questionMdl = mongoose.model('Question', questionSchema);

export default questionMdl;