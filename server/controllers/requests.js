import express from 'express';
import mongoose from 'mongoose';
import request from '../models/request.js';

const router = express.Router();

export const getRequests=async(req,res)=>{
    try {
        const allrequests=await request.find().sort({ _id: -1 })
        res.json(allrequests)
    } catch (error) {
        res.send(err);
    }

}

export const acceptRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const updateRequest = await request.findOneAndUpdate(
            { _id: id },
            { requestStatus: 'Approved', inTime: new Date().toISOString() },
            { new: true } // Options object
        );
        res.json(updateRequest);
    } catch (error) {
        res.status(500).json({ message: 'Error accepting request.' });
    }
};


export const rejectRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const updateRequest = await request.findOneAndUpdate(
            { _id: id },
            {
                requestStatus: `Declined`,
                inTime: new Date().toISOString(),
                outTime: new Date().toISOString()
            },
            { new: true } // This option returns the updated document
        );
        res.json(updateRequest);
    } catch (error) {
        res.send(error);
    }
}


export const createRequest=async(req,res)=>{
    const reque=req.body;
    const newRequest=new request({...reque,requestedBy:req.userId})
    try{
        await newRequest.save()
        res.status(201).json(newRequest);
    }catch(error) {
        res.send(error);
    }
}

export const submitEquip = async (req, res) => {
    const { id } = req.params;
    const { remarks } = req.body;
    const updatedRequest = { remarks:remarks,requestStatus: `Approved and Returned`, outTime: new Date().toISOString(), _id: id };
    
    try {
        const updatedPost = await request.findByIdAndUpdate(id, updatedRequest, { new: true });
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
