const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
});

describe("stuff", () => {
    test("a specific blog is within the returned blog", async () => {
        const response = await api.get("/api/blogs");

        const contents = response.body.map((r) => r.title);

        expect(contents).toContain("Title1");
    });

    test("succeeds with a valid id", async () => {
        const blogAtStart = await helper.blogsInDb();

        const blogToView = blogAtStart[0];

        const resultsBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const processedBlogToView = JSON.parse(JSON.stringify(blogToView));

        expect(resultsBlog.body).toEqual(processedBlogToView);
    });

    test("succeeds with valid data", async () => {
        const newBlog = {
            title: "Title2",
            author: "Author2",
            url: "www.url2.com",
            likes: 2,
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

        const contents = blogsAtEnd.map((n) => n.title);
        expect(contents).toContain("Title2");
    });

    test("if like missing its automatically 0", async () => {
        const newBlog = {
            title: "Title2",
            author: "Author2",
            url: "www.url2.com",
        };

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const blogsAtEnd = await helper.blogsInDb();
        const contents = blogsAtEnd.slice(-1)[0].likes;
        expect(contents).toEqual(0);
    });

    test("send to post", async () => {
        const newBlog = {
            author: "Author2",
            url: "www.url2.com",
            likes: 2,
        };

        await api.post("/api/blogs").send(newBlog).expect(400);
    });

    test("delete stuff", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

        const contents = blogsAtEnd.map((r) => r.title);

        expect(contents).not.toContain(blogToDelete.title);
    });

    test("update data", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogsToUpdate = blogsAtStart[0];

        const updatedBlog = {
            title: "Title3",
            author: "Author3",
            url: "www.url3.com",
            likes: 3,
        };

        await api
            .put(`/api/blogs/${blogsToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect("Content-Type", /application\/json/);

        const newBlog = await helper.blogsInDb();

        expect(newBlog[0]).toMatchObject(updatedBlog);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
