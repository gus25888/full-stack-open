const Header = ({ course }) => <h2>{course}</h2>

const Total = ({ sum }) => <p><strong>total of {sum} exercises</strong></p>

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => (parts.map(part => <Part key={part.id} part={part} />))

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total sum={course.parts.reduce((accumulator, currVal) => accumulator + currVal.exercises, 0)} />
        </div>
    )
}

export default Course