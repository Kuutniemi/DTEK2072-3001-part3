const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ part }) => {
  return (
    <div>
      {part.map((part, i) => (
        <Part key={i} part={part} />
      ))}
    </div>
  );
};

const Total = ({ part }) => {
  return (
    <p>
      Number of exercises{" "}
      {part[0].exercises + part[1].exercises + part[2].exercises}
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header course={name} />
      <Content part={parts} />
    </>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    id: 1,
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

export default App;
