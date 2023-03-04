import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import validator from "validator";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username area is required"],
        lowercase: true,
        validate: [validator.isAlphanumeric, "Only Alphanumeric Characters"]

    },
    email: {
        type: String,
        required: [true, "Email area is required"],
        unique: true,
        validate: [validator.isEmail, "Valid email is required"]
    },
    password: {
        type: String,
        required: [true, "Password area is required"],
        minlength: [4, "At least 4 characters"]
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
},
    {
        timestamps: true
    })

userSchema.pre("save", function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (err, hashedPassword) => {
        user.password = hashedPassword;
        next()
    })
})


const User = mongoose.model("User", userSchema)

export default User;