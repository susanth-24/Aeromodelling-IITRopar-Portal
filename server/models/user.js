import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    post:{type:String,required:true},
    mobileNumber:Number,
    password: { type: String, required: true },
    projects:{type:[String],default:[]},
    description:{ type: String, required: true },
    id: { type: String },
})

export default mongoose.model("User", userSchema);