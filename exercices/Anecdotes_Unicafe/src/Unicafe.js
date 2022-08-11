import { useState } from "react";

const StatisticLine = ({ text, value }) => {
    return (
        <tr>
            <td>{text}:</td>
            <td>{value}</td>
        </tr>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="netrual" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={good + neutral + bad} />
                <StatisticLine
                    text="avarage"
                    value={(good - bad < 0 ? 0 : good - bad) / (good + neutral + bad)}
                />
                <StatisticLine
                    text="positive"
                    value={(100 / (good + neutral + bad)) * good + "%"}
                />
            </tbody>
        </table>
    );
};

const Button = ({ text, event, state, set }) => {
    return <button onClick={() => event(state, set)}>{text}</button>;
};

export default function Unicafe() {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const setStatics = (state, set) => {
        set(state + 1);
    };

    return (
        <>
            <h1>Unicafe</h1>
            <h2>Give Feedback</h2>
            <Button text={"Good"} event={setStatics} state={good} set={setGood} />
            <Button text={"Netural"} event={setStatics} state={neutral} set={setNeutral} />
            <Button text={"Bad"} event={setStatics} state={bad} set={setBad} />

            <h2>Statistics</h2>
            {good || neutral || bad ? (
                <Statistics good={good} neutral={neutral} bad={bad} />
            ) : (
                "No feedback given"
            )}
        </>
    );
}
