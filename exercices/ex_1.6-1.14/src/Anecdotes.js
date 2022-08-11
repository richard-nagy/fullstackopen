import { useState } from "react";

export default function Anecdoes() {
    const anecdotes = [
        "If it hurts, do it more often.",
        "Adding manpower to a late software project makes it later!",
        "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
        "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
        "Premature optimization is the root of all evil.",
        "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
        "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    ];

    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0]);
    const mostVoted = votes.indexOf(Math.max(...votes));

    return (
        <div>
            <h1>Anecdotes</h1>

            <button
                onClick={() => {
                    setSelected(Math.floor(Math.random() * 7));
                }}
            >
                next anecdote
            </button>
            <button
                onClick={() => {
                    setVotes(
                        votes.map((e, i) => {
                            if (i === selected) return e + 1;
                            return e;
                        })
                    );
                }}
            >
                vote
            </button>

            <h4>votes: {votes[selected]}</h4>
            {anecdotes[selected]}
            <h2>Anecdote with most votes</h2>
            <h4>votes: {votes[mostVoted]}</h4>
            {anecdotes[mostVoted]}
        </div>
    );
}
