import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NoteForm from "./NoteForm";
import userEvent from "@testing-library/user-event";

test("renders content", () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    render(<Note note={note} />);

    const element = screen.getByText("Component testing is done with react-testing-library");

    screen.debug(element);

    expect(element).toBeDefined();
});

test("clicking the button calls event handler once", async () => {
    const note = {
        content: "Component testing is done with react-testing-library",
        important: true,
    };

    const mockHandler = jest.fn();

    render(<Note note={note} toggleImportance={mockHandler} />);

    const user = userEvent.setup();
    const button = screen.getByText("make not important");
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);
});

test("<NoteForm /> updates parent state and calls onSubmit", async () => {
    const createNote = jest.fn();
    const user = userEvent.setup();

    render(<NoteForm createNote={createNote} />);

    const input = screen.getByRole("textbox");
    const sendButton = screen.getByText("save");

    await user.type(input, "testing a form...");
    await user.click(sendButton);

    expect(createNote.mock.calls).toHaveLength(1);
    expect(createNote.mock.calls[0][0].content).toBe("testing a form...");
});
