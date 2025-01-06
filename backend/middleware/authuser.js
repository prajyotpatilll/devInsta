import jwt from "jsonwebtoken"


const authuser = async (req, res, next)=>{
    try {
        const {token} = req.headers
        if(!token){
            res.json({success:false, message:"Not authorized login again 1"})
        }

        const token_decode = jwt.verify(token,process.env.JWT_SECREATE_TOKEN)

        req.body.userid = token_decode.id

        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

export default authuser