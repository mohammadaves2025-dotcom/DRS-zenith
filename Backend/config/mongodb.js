import mongoose from "mongoose";

const connectDB = async () => {

    mongoose.connection.on('connected', () => {
        console.log('DB connected');

    })
    mongoose.connection.once("open", () => {
        console.log("CONNECTED TO DB:", mongoose.connection.name);
    });

    await mongoose.connect(`${process.env.MONGO_DB_URI}`)
}
export default connectDB;