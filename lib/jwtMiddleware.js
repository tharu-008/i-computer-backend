import jwt from "jsonwebtoken";

export default function authorizeUser(req,res,next){
       

        const header = req.header("Authorization")// authoric=zation : Bearer <token>

        if (header != null){ //header exists
            

            const token = header.replace("Bearer ","")//Bearer <token>
            console.log(token)


            jwt.verify(token,"i-computers-54!",//verify token , if valid pass to next middleware and add payload to req.user
                (err,decoded)=>{//decoded -> payload
                   
                    if (decoded == null){
                       res.status(401).json({
                        message:"Invalid token please login again"
                       })
                   
                    }else{
                        req.user = decoded
                        next()
                    }
                    
                } 
            )

        }else{

        next()

    }
}
