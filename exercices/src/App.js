const Header = ({ course }) => {
    return <h1>{course}</h1>;
};

const Content = ({ part, exercises }) => {
    return (
        <>
            {part.map((element, index) => {
                return (
                    <p>
                        {element} {exercises[index]}
                    </p>
                );
            })}
        </>
    );
};

const Total = ({ exercises1, exercises2, exercises3 }) => {
    return <p>{exercises1 + exercises2 + exercises3}</p>;
};

const App = () => {
    const course = "Half Stack application development";
    const part1 = "Fundamentals of React";
    const exercises1 = 10;
    const part2 = "Using props to pass data";
    const exercises2 = 7;
    const part3 = "State of a component";
    const exercises3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content
                part={[part1, part2, part3]}
                exercises={[exercises1, exercises2, exercises3]}
            />
            <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3} />
        </div>
    );

    // return (
    //     <div>
    //         <h1>{course}</h1>
    //         <p>
    //             {part1} {exercises1}
    //         </p>
    //         <p>
    //             {part2} {exercises2}
    //         </p>
    //         <p>
    //             {part3} {exercises3}
    //         </p>
    //         <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    //     </div>
    // );
};

export default App;
