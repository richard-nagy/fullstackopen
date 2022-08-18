const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
    Blog.find({}).then((notes) => {
        response.json(notes);
    });
});

blogsRouter.post("/", (request, response, next) => {
    const body = request.body;

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
    });

    blog.save()
        .then((sabedBlog) => {
            response.json(sabedBlog);
        })
        .catch((error) => next(error));
});

module.exports = blogsRouter;

// app.get("/api/blogs", (request, response) => {
//     Blog.find({}).then((blogs) => {
//         response.json(blogs);
//     });
// });

// app.post("/api/blogs", (request, response) => {
//     const blog = new Blog(request.body);

//     blog.save().then((result) => {
//         response.status(201).json(result);
//     });
// });
