import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseVotes } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes);
    console.log(anecdotes);
    const dispatch = useDispatch();

    const [filter, setFilter] = useState();

    const vote = (id) => {
        dispatch(increaseVotes(id));
    };

    return (
        <div>
            <input value={filter} onChange={(e) => setFilter(e.target.value)} />
            {anecdotes
                .filter((anecdote) => anecdote.content.includes(filter))
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default AnecdoteList;
