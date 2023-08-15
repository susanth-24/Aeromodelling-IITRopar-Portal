import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: String,
    content: String,
    name: String,
    creator: String,
    tags:[String],
    link:String,
    likes: { type: [String], default: [] },
    comments: {
        type: [
            {
                commenter: { type: String },
                comment: { type: String },
                timeAt: {
                    type: Date,
                    default: new Date()
                },
            }
        ],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});
const blogMessage = mongoose.model('blogMessage', blogSchema);

export default blogMessage;