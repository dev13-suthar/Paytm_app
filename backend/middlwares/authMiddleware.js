import jwt from "jsonwebtoken"

export const authMiddlware = (req,res,next)=>{
        const authHeader = req.headers["authorization"] ?? "";
        
            // const decoded = jwt.verify(authHeader,process.env.JWT_SECRET);
            // if(decoded.userName){
            //     req.userName = decoded.userName
            //     return next();
            // }else{
            //     return res.status(403).json({
            //         message:"u are Not Authorizeddd"
            //     })
            // }
            if(!authHeader || !authHeader.startsWith('Bearer ')){
                return res.status(403).json({});
            }
            const token = authHeader.split(' ')[1];
            try{
                const decoded = jwt.verify(token,process.env.JWT_SECRET);
                req.userName = decoded.userName;
                req.userId = decoded.userId;
                next()
            }catch (error) {
            return res.status(403).json({
                message: "u are not logged in",
              });
        }
}