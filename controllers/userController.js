import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';


const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        res.redirect("/login")
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        let same = false;

        if (user) {
            same = await bcrypt.compare(password, user.password)
        } else {
            return res.status(401).json({
                success: false,
                message: "There is no such an user."
            })
        }

        if (same) {
            const token = createToken(user._id)
            res.cookie("jwt", token, {
                httpOnly: true, //frontendden istek gelebilir
                maxAge: 1000 * 60 * 60 * 24 //ms cinsinden
            })
            res.redirect("/users/dashboard")
        } else {
            return res.status(401).json({
                success: false,
                message: "Passwords are not match"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
        })
    }
}

const createToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

const getDashboardPage = (req, res) => {
    res.render("dashboard", {
        link: "dashboard"
    })
}

export { createUser, loginUser, getDashboardPage };