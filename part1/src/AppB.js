import { useState } from "react";

const Display = ({ counter }) => {
    return <div>{counter}</div>;
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

export default function AppB() {
    const [counter, setCounter] = useState(0);

    const increaseByOne = () => setCounter(counter + 1);
    const setToZero = () => setCounter(0);

    return (
        <div>
            <h1>B</h1>
            <Display counter={counter} />
            <Button onClick={increaseByOne} text="add" />
            <Button onClick={setToZero} text="zero" />
        </div>
    );
}
