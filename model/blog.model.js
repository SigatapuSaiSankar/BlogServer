import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now()//will update the date when i object is created
    }
})

export default mongoose.model("Blog",blogSchema);
// first parameter is the name of the collection u want to create
// always try to mention the collection name in singler form
// because mongoose will create the collection with name of plural(including s) and all the characters in lower case
// even when u try to access the collection name use the name with which u created it (it will automatically chanage it into required format i.e, all 
// characters in lower case and with plural form)