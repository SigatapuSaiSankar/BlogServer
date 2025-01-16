import { decrypt } from "dotenv";
import User from "../model/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_KEY, { expiresIn: "1d" });
    // this generated JWT token expires in one day
}

export const registerUser = async (req, res, next) => {
    const { email, password, name, phone, profileimage } = req.body;
    try {
        let user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ success: false, message: "email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({
            name: name,
            email: email,
            password: hashedPassword,
            phone: phone,
            profileimage: profileimage
        })

        await user.save();
        return res.status(200).json({ success: true, message: "User registered successfully" });
    }
    catch (err) {
        // console.log(err)
        return res.status(500).json({ success: false, message: "server error" });
    }
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found with email" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        // console.log(isPasswordMatch)
        if (!isPasswordMatch) {
            return res
                .status(400)
                .json({ success: false, message: " wrong passowrd" });
        }

        const token = generateToken(user);
        console.log(user._doc)
        const {role,...rest} = user._doc;

        return res.status(200).json({success: true, message: "Login Successful", token:token,data:{...rest},role:role});

    } catch (error) {
        // console.log(error)
        return res.status(500).json({success:false,message:"server error"});
    }
}