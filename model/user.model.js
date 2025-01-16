import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    phone: Number,
    role:{
        type: String,
        enum:["user", "admin","super-admin"],
        default: "user"
    },
    profileImage:{
        type: String,
        default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }
})

export default mongoose.model("User", userSchema);