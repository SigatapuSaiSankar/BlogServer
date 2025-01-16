import express from 'express';
import { allBlogs, blogByTopicUsingParam, blogByTopicUsingQuery, BlogInfoById, createBlog, deleteBlog, editBlog } from '../controller/blog.controller.js';
import { authenticate } from '../auth/verifyToken.js';

const router = express.Router();

router.post("/createblog",authenticate,createBlog);
router.put("/editblog/:id",authenticate,editBlog);
router.delete("/deleteblog/:id",authenticate,deleteBlog);
router.get("/allblogs",allBlogs);
router.get("/blogInfoById/:id",BlogInfoById);
router.get("/blogbytopicusingparams/:topic",blogByTopicUsingParam);
router.get("/blogbytopicusingquery",blogByTopicUsingQuery)//https://localhost:8000/api/v1/blog/blogbytopicusingquery?topic=laptop

export default router;  