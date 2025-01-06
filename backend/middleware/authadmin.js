import jwt from "jsonwebtoken"


const authAdmin = async (req, res, next)=>{
    try {
        const {atoken} = req.headers
        if(!atoken){
            res.json({success:false, message:"Not authorized login again 1"})
        }

        const token_decode = jwt.verify(atoken,process.env.JWT_SECREATE_TOKEN)

        if(token_decode !== process.env.ADMIN_EMAIL  +  process.env.ADMIN_PASSWORD){
            res.json({success:false, message:"Not authorized login again 2"})
        }

        next()
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }

}

export default authAdmin