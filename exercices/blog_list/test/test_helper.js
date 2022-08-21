const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "Title0",
        author: "Author0",
        url: "www.url0.com",
        likes: 0,
    },
    {
        title: "Title1",
        author: "Author1",
        url: "www.url1.com",
        likes: 1,
    },
];

const nonExistingId = async () => {
    const blog = new Blog({
        title: "willremovethissoon",
        author: "no author",
        url: "none",
        likes: 0,
    });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((blog) => blog.toJSON());
};

module.exports = {
    initialBlogs: initialBlogs,
    nonExistingId,
    blogsInDb: blogsInDb,
};
