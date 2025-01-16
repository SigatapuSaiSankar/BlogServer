import mongoose from "mongoose";
import User from "../model/user.model.js";

export const editUserInfo = async (req, res, next) => {
    const id = req.params.id;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid Id" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await User.findByIdAndUpdate(id, { $set: req.body }, { new: true });

        return res.status(200).json({ success: true, message: "User updated successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const deleteUser = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid Id" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ success: true, message: "User Deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.find();
        return res.status(200).json({ success: true, message:"Users found",data:users});
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"server error"});
    }
}

export const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ success: false, message: "Invalid Id" });
        }

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User found", data: user});
    } catch (error) {
        return res.status(500).json({ success: false, message: "Server error" });
    }
}