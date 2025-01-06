import mongoose from "mongoose";

const conectDB = async ()=>{

    mongoose.connection.on(`connected`, ()=> console.log('database is connected'))

    await mongoose.connect(`${process.env.MONGODB_URL}/devinsta`)
}

export default conectDB    