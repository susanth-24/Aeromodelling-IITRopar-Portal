import mongoose from "mongoose";

const requestSchema = mongoose.Schema({
    itemName:String,
    quantity:String,
    name:String,
    requestedBy:String,
    requestTime:Number,
    inTime:{type:String,default:0},
    outTime:{type:String,default:0},
    requestStatus:{type:String,default:"Pending"},
    reason:String,
    remarks:String,
});

const request = mongoose.model('request', requestSchema);

export default request;