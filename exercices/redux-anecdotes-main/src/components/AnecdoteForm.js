import { useDispatch } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
    const dispatch = useDispatch();

    const addNew = (event) => {
        event.preventDefault();
        dispatch(newAnecdote(event.target.content.value));
        dispatch(newNotification("New anecdote added"));
        event.target.content.value = "";
    };

    return (
        <div>
            <h2>Anecdotes</h2>

            <h2>create new</h2>
            <form onSubmit={addNew}>
                <div>
                    <input name="content" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
