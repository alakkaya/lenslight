import express from 'express';
import dotenv from 'dotenv';
import conn from './db.js';
import cookieParser from 'cookie-parser';
import pageRoute from "./routes/pageRoute.js"
import photoRoute from "./routes/photoRoute.js"
import userRoute from "./routes/userRoute.js"
import { checkUser } from './middlewares/authMiddleware.js';


dotenv.config();

//connection to db;
conn();

const app = express()
const port = process.env.PORT

//ejs template engine
app.set("view engine", "ejs")

//static files middleware
app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true })) //forman gelen dataları parse edebilmek için
app.use(cookieParser())

//routes
app.get("*", checkUser) //tüm get fonk. bunu kontrol eder
app.use("/", pageRoute)
app.use("/photos", photoRoute)
app.use("/users", userRoute)


app.listen(port, () => {
    console.log(`App running on port: ${port}`);
})