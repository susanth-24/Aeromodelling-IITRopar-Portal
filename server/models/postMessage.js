import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: String,
    description: String,
    type:String,
    imageLink:String,
    name:String,
    creator: String,
    projectManager:String,
    teamMembers:[String],
    tags: [String],
    status:String,
    startDate:String,
    remark:String,
    createdAt: {
        type: Date,
        default: new Date()
    },
});

const postMessage = mongoose.model('postMessage', postSchema);

export default postMessage;