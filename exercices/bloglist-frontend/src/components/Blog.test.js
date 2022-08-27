import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
    let container;

    const mockHandler = jest.fn();

    const blog = {
        id: 1,
        likes: 1,
        title: "test title",
        author: "test author",
        url: "test.url",
    };

    const likeHandler = () => {
        blog.likes = blog.likes + 1;
    };

    beforeEach(() => {
        container = render(
            <Blog blog={blog} deleteBlog={mockHandler} updateBlog={likeHandler} />
        ).container;
    });

    test("renders its children", async () => {
        await screen.findAllByText("test title");
    });

    test("at start the children are not displayed", () => {
        const testUrl = screen.queryByText("test.url");
        expect(testUrl).toBeNull();
    });

    test("check button click", async () => {
        const user = userEvent.setup();
        const button = screen.getByText("info");
        await user.click(button);

        const testUrl = screen.queryByText("test.url");
        expect(testUrl).toBeTruthy();
    });

    test("check like click", async () => {
        const user = userEvent.setup();

        const buttonInfo = screen.getByText("info");
        await user.click(buttonInfo);

        const buttonLike = screen.getByText("like");
        await user.click(buttonLike);
        await user.click(buttonLike);

        const div = container.querySelector(".likes");
        expect(div).toHaveTextContent("3");
    });
});
