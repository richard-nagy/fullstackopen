const dummy = (blogs) => {
    return !blogs.length ? 1 : blogs.length;
};

const totalLikes = (blogs) => {
    let likes = 0;

    blogs.forEach((blog) => {
        likes += blog.likes;
    });

    return likes;
};

const favoriteBlog = (blogs) => {
    const likes = blogs.map((blog) => {
        return blog.likes;
    });

    return blogs[likes.indexOf(Math.max(...likes))];
};

const mostBlogs = (blogs) => {
    const authors = [];
    const numbers = [];

    blogs.forEach((blog) => {
        if (authors.indexOf(blog.author) >= 0) {
            const index = authors.indexOf(blog.author);
            numbers[index]++;
        } else {
            authors.push(blog.author);
            numbers.push(1);
        }
    });

    const index = numbers.indexOf(Math.max(...numbers));
    return { author: authors[index], blogs: numbers[index] };
};

const mostLikes = (blogs) => {
    const authors = [];
    const likes = [];

    blogs.forEach((blog) => {
        if (authors.indexOf(blog.author) >= 0) {
            const index = authors.indexOf(blog.author);
            likes[index] += blog.likes;
        } else {
            authors.push(blog.author);
            likes.push(blog.likes);
        }
    });

    const index = likes.indexOf(Math.max(...likes));
    return { author: authors[index], likes: likes[index] };
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
