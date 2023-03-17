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

export default Course;
