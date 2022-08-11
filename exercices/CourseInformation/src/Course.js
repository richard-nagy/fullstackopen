const Header = ({ course }) => {
    return <h2>{course}</h2>;
};

const Part = ({ name, exercise }) => {
    return (
        <p key={name}>
            {name} {exercise}
        </p>
    );
};

const Content = ({ parts }) => {
    return (
        <>
            {parts.map((part) => {
                return <Part key={part.id} name={part.name} exercise={part.exercises} />;
            })}
        </>
    );
};

const Total = ({ exercises }) => {
    return <b>total of {exercises} exercises</b>;
};

export default function ({ courses }) {
    return (
        <>
            {courses.map((course) => {
                return (
                    <div key={course.name}>
                        <Header course={course.name} />
                        <Content parts={course.parts} />
                        <Total
                            exercises={course.parts
                                .map((exercise) => {
                                    return exercise.exercises;
                                })
                                .reduce(
                                    (previousValue, currentValue) => previousValue + currentValue,
                                    0
                                )}
                        />
                    </div>
                );
            })}
        </>
    );
}
