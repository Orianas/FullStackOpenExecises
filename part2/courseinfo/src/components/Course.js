const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

const Header = ({ name }) => {
    return (
        <h1>{name}</h1>
    )
}

const Part = ({ name, exercises }) => <li>{name} {exercises}</li>

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map(part =>
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
        </ul>
    )
}

const Total = ({ parts }) => {
    const total = parts.reduce((accumulator, currentValue) =>
        accumulator + currentValue.exercises, 0)

    return (
        <b>Number of exercises {total}</b>
    )
}

export default Course