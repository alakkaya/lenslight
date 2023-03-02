import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URI, {
        dbName: "lenslight",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to DB succesfully");
    }).catch((err) => {
        console.log(`DB connection err: ${err}`);
    })
}

export default conn;