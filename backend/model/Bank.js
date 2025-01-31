import mongoose from "mongoose";

const AccounSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
});

const Account = mongoose.model("Account",AccounSchema);
export default Account;