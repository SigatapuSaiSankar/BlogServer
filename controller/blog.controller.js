import mongoose from "mongoose";
import Blog from "../model/blog.model.js";//we need to mention .js extension

export const createBlog = async (req, res) => {
    // app.use(express.json());//add this statement in index.js where all initiation are written(you can write it any where but if u write in index,js it is applicable to all)
    const { title, topic, content } = req.body;// we will be sending data from postman from Body - raw
    // {
    //     "title": "First Blog",
    //     "topic": "First Topic",
    //     "content": "First Content"
    // }
    console.log(`${title} ${topic} ${content}`);

    try {
        const blogObj = new Blog({ title: title, topic: topic, content: content });
        await blogObj.save()
        return res.status(200).json({success: true, message:"Blog saved"});//we will be sending a json responce from server
    }
    catch (err) {
        res.status(500).json({success: false, message: "Server error: " + err.message});
    }
}


export const editBlog = async(req,res)=>{
    const blogId = req.params.id;

    try {

        if(!mongoose.Types.ObjectId.isValid(blogId)){
            return res.status(404).json({success:false,message:"Invalid BlogId"});
        }

        const blog = await Blog.findById(blogId);
        // when ever we try to findById with a invalid id then it itself will throw an error and catch block will execute
        // so we validate first

        if(!blog){
            return res.status(404).json({success: false, message:"Blog not found"});
        }

        // const updatedBlog = await Blog.findByIdAndUpdate(blogId, {title: req.body.title, topic: req.body.topic, content: req.body.content },{new: true});
        // using title : req.body.title and so on and mentioning everything is another approach which required another parameter
        // the best way to use it is using $set - it helps in directly mentioning the updated keys with the specific values
        const updatedBlog = await Blog.findByIdAndUpdate(blogId, {$set:req.body},{new: true});

        return res.status(200).json({success:true, message:"Blog Updated successfully"});
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Error"});
    }
    // console.log(blogId);
}

export const deleteBlog = async (req, res) => {
    const blogId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(blogId)){
        return res.status(404).json({success:false,message:"Invalid BlogId"})
    }
    
    try {
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({success:false, message:"Blog not found"});
        }

        await Blog.findByIdAndDelete(blogId);
        return res.status(200).json({success:true, message: "Blog deleted"});
    } catch (error) {
        return res.status(500).json({success:false, message: "Server Error"});
    }
}

export const allBlogs = async(req,res)=>{
    try {
        const allBlogsData = await Blog.find();
        return res.status(200).json({success:true, message:"All blogs Data",data: allBlogsData});
    } catch (error) {
        return res.status(500).json({success:false,message:"No data Found"});
    }
}

export const BlogInfoById = async(req, res)=>{
    const blogId = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(blogId)){
        return res.status(404).json({success:false, message:"Invalid Blog Id"})
    }
    try {
        const blog = await Blog.findById(blogId);
        if(!blog){
            return res.status(404).json({success:true,message:"Blog Not exists"})
        }

        return res.status(200).json({success:true,message:"Blog Data", data:blog});
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Error"});
    }
}

export const blogByTopicUsingParam = async(req,res)=>{
    const topic = req.params.topic;
    try {
        // const blogs = await Blog.find({topic:topic});
        const blogs = await Blog.find({topic:new RegExp(topic,"i")});//to avoid case sensitivity while searching in DB
        if(!blogs || blogs.length === 0){
            return res.status(404).json({success:false,message:`Blog doesnt exits on topic: ${topic}`});
        }
        return res.status(200).json({success:false, message:"Blog Found", data:blogs})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Error"});
    }
}

export const blogByTopicUsingQuery = async(req,res)=>{
    // url looks like - https://localhost:8000/api/v1/blog/blogbytopicusingquery?topic=laptop
    const topic = req.query.topic;
    try {
        // const blogs = await Blog.find({topic:topic});
        const blogs = await Blog.find({topic:new RegExp(topic,"i")});//to avoid case sensitivity while searching in DB
        if(!blogs || blogs.length === 0){
            return res.status(404).json({success:false,message:`Blog doesnt exits on topic: ${topic}`});
        }
        return res.status(200).json({success:false, message:"Blog Found", data:blogs})
    } catch (error) {
        return res.status(500).json({success:false,message:"Server Error"});
    }
}