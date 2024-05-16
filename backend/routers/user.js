import { Router } from "express";
import {z} from "zod"
import bcrypt from "bcrypt"
import User from "../model/User.js";
import jwt from "jsonwebtoken"
import { authMiddlware } from "../middlwares/authMiddleware.js";
import Account from "../model/Bank.js";

const router = Router();

const signUpSchema = z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().min(6),
    userName:z.string()
})

router.patch("/update",authMiddlware,async(req,res)=>{
     const userName = req.userName
     const {firstName,lastName,newPassword} = req.body;
        try {
            const findUser = await User.findOne({
                userName:userName
             });
             if(!findUser){
                throw new Error("Cannot find user with this nAme");
             }
             if(firstName){
                 findUser.firstName = firstName
                await findUser.save();
             };
            
            //  Last Name Upda
             if(lastName){
                findUser.lastName = lastName
               await findUser.save();
            };
        
            // Password
            if(newPassword){
                findUser.password = newPassword;
                await findUser.save();
            }

            return res.json({
                mesg:"upated"
            })

        } catch (error) {
            res.status(400).json({
                error:error.message
            })
        }
})

router.post("/signIn",async(req,res)=>{
    try {
        const body = req.body;
        const validate = signUpSchema.safeParse(body);
        if(!validate.success){
            return res.status(411).json({
                message:"incorret Inputs "
            })
        };

        const foundUser = await User.findOne({userName:validate.data.userName});
        if(!foundUser){
            throw new Error("Cannot find User with this UserName")
        };

        const isMatch = await bcrypt.compare(validate.data.password,foundUser.password);
        if(!isMatch){
            res.status(403).json({
                message:"incorret Password try againnn"
            })
        };

        const token = jwt.sign({userName:foundUser.userName,
            userId:foundUser._id
        },process.env.JWT_SECRET);
        res.status(200).json({token,foundUser});
    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})

router.post("/signUp",async(req,res)=>{
    try {
        const body = req.body;
       const validate =  signUpSchema.safeParse(body);
       if(!validate.success){
        return res.status(411).json({
            message:"Wrong Inputs Foundd"
        })
       }
       const salt = await bcrypt.genSalt();
       const HashedPassword = await bcrypt.hash(validate.data.password,salt);
       const newUser = new User({
            firstName:validate.data.firstName,
            lastName:validate.data.lastName,
            password:HashedPassword,
            userName:validate.data.userName
       });
       await newUser.save();
       
       const userId = newUser._id;
       await Account.create({
            userId,
            balance:1 + Math.random() * 10000
       });

       res.status(201).json({
        message:"New User Createddd!!"
       })

    } catch (error) {
        res.status(400).json({
            error:error.message
        })
    }
})

router.get("/bulk",authMiddlware,async(req,res)=>{
    const filter= req.query.filter || "";

    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            },
            lastName:{
                "$regex":filter
            }
        }]
    });

    res.json({
        user:users.map(user=>({
            userName:user.userName,
            lastName:user.lastName,
            firstName:user.firstName,
            _id:user._id
        }))
    })
})

export default router;

// eyJhbGciOiJIUzI1NiJ9.ZGV2MDkw.GwC_OZN6j4-P7O2uq6riTDnrjO727St4_VUHZ_WsSSg