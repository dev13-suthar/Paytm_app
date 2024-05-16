import express from 'express'
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRouter from "./routers/user.js"
import AccountRouter from "./routers/balance.js"
import cors from "cors"
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use("/user/v1",UserRouter);
app.use("/account/v1",AccountRouter)




const PORT = process.env.PORT || 6007;
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>console.log(`Server Port:${PORT}`))
}).catch((err)=>console.log(err))

