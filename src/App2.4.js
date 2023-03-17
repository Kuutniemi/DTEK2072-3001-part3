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
  // const total = part.reduce((s, p) => console.log(s, p));
  return (
    <p>
      Number of exercises{" "}
      {part.reduce((total, part) => total + part.exercises, 0)}
    </p>
  );
};

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <>
      <Header course={name} />
      <Content part={parts} />
      <Total part={parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      {courses.map((course, i) => (
        <Course key={i} course={course} />
      ))}
    </div>
  );
};

export default App;
