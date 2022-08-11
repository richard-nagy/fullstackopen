const Header = ({ course }) => {
    return <h2>{course}</h2>;
};

const Content = ({ part, exercises }) => {
    return (
        <>
            {part.map((element, index) => {
                return (
                    <p key={element}>
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

export default function App() {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
            },
            {
                name: "State of a component",
                exercises: 14,
            },
        ],
    };

    return (
        <div>
            <Header course={course.name} />
            <Content
                part={[course.parts[0].name, course.parts[1].name, course.parts[2].name]}
                exercises={[
                    course.parts[0].exercises,
                    course.parts[1].exercises,
                    course.parts[2].exercises,
                ]}
            />
            <Total
                exercises1={course.parts[0].exercises}
                exercises2={course.parts[1].exercises}
                exercises3={course.parts[2].exercises}
            />
        </div>
    );
}
