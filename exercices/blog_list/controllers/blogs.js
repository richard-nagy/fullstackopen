const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { checkTitleUrl } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user");

    response.json(blogs);
});

blogsRouter.get("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    if (blog) {
        response.json(blog);
    } else {
        response.status(404).end();
    }
});

blogsRouter.post("/", checkTitleUrl, async (request, response) => {
    const body = request.body;

    if (!request.user) {
        return response.status(401).json({ error: "token missing or invalid" });
    }
    const user = await User.findById(request.user);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    const blog = await Blog.findById(request.params.id);
    const blogUserId = blog.user.toString();

    // If we try to delete a blog
    // that doesnt belong to the logged in user
    // Deletion is not allowed
    if (request.user !== blogUserId) {
        return response.status(401).json({ error: "cant delete other users blog" });
    }

    await Blog.findByIdAndRemove(request.params.id);

    const blogs = await Blog.find({}).populate("user");
    console.log(blogs);

    response.status(201).json(blogs);
});

blogsRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    };

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then((updateBlog) => {
            response.json(updateBlog);
        })
        .catch((error) => next(error));
});

module.exports = blogsRouter;
