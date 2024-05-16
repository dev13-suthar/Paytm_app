import { Router } from "express";
// import {z} from "zod"
// import bcrypt from "bcrypt"
// import User from "../model/User.js";
// import jwt from "jsonwebtoken"
import { authMiddlware } from "../middlwares/authMiddleware.js";
import Account from "../model/Bank.js";
import mongoose from "mongoose";


const router = Router();

router.get("/balance",authMiddlware,async(req,res)=>{
        const userid = req.userId;

        const balance = await Account.findOne({
            userId:userid
        });
        const amount = balance.balance
        if(!balance){
            res.status(404).json({
                message:"cannot find use"
            })
        }

        res.json({
            amount:amount
        })
})

router.post("/transfer",authMiddlware,async(req,res)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
    const {amount,to} = req.body;
    const account = await Account.findOne({userId:req.userId}).session(session);
    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }

    const toAccount = await Account.findOne({userId:to}).session(session);
    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            message: "Invalid account"
        });
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    await session.commitTransaction();
    res.json({
        message:"Transfter Succeded"
    })

})
export default router