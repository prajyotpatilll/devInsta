import express from "express"
import cors from "cors"
import 'dotenv/config'
import conectDB from "../config/mongodb.js"
import connectCloudinary from "../config/cloudinery.js"
import useRouter from "../routes/userroute.js"
import adminroute from "../routes/adminroute.js"
// import useRouter from "../routes/userroutes.js"
// import playerRouter from "../routes/playerroute.js"

// import adminrouter from "../routes/adminrout.js"
// import doctorrouter from "../routes/doctorroute.js"



const app = express()
const port = process.env.PORT || 4000
conectDB()
connectCloudinary()

app.use(express.json())
app.use(cors())


app.use('/api/user',useRouter)
app.use('/api/admin',adminroute)



app.get('/' ,(req,res)=>{
    res.send('Api is working')
})

app.listen(port , ()=> console.log("server started",port))