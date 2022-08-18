const listHelper = require("../utils/list_helper");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    const listWithOneBlog = [
        {
            _id: "5a422aa71b54a676234d17f8",
            title: "Go To Statement Considered Harmful",
            author: "Edsger W. Dijkstra",
            url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
            likes: 5,
            __v: 0,
        },
    ];

    test("when list has only one blog, equals the likes of that", () => {
        const result = listHelper.totalLikes(listWithOneBlog);
        expect(result).toBe(5);
    });

    const mostLikes = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        },
    ];

    test("who have the most likes", () => {
        const result = listHelper.favoriteBlog(mostLikes);
        expect(result).toBe(mostLikes[0]);
    });

    const stuff = [
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        },
        {
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            likes: 12,
        },
        {
            title: "yes",
            author: "Bob",
            likes: 6,
        },
    ];

    test("most blogs", () => {
        const result = listHelper.mostBlogs(stuff);
        expect(result).toStrictEqual({
            author: "Edsger W. Dijkstra",
            blogs: 2,
        });
    });

    test("most likes again", () => {
        const result = listHelper.mostLikes(stuff);
        expect(result).toStrictEqual({
            author: "Edsger W. Dijkstra",
            likes: 24,
        });
    });
});
