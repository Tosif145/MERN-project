import mongoose  from "mongoose";

const connectDB = async() => {
    // console.log(process.env.MONGO_URI);
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Successfully connected.');
    } catch(err){
        console.error(`ERROR: ${err.message}`)
        process.exit(1)
    }
}

export default connectDB;