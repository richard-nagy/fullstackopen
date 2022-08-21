const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const { checkTitleUrl } = require("../utils/middleware");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({});
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

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
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
