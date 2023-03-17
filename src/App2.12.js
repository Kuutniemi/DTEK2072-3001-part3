import axios from "axios";
import { useEffect, useState } from "react";

const PersonForm = ({
  handleSubmit,
  setNewName,
  setNewNumber,
  newNumber,
  newName,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        name:{" "}
        <input
          value={newName}
          onChange={(e) => setNewName(e.currentTarget.value)}
        />
      </div>
      <div>
        number:{" "}
        <input
          value={newNumber}
          onChange={(e) => setNewNumber(e.currentTarget.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Person = ({ person }) => {
  return (
    <p>
      {person.name} {person.number}
    </p>
  );
};

const PersonsRender = ({ persons }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <Person key={i} person={person} />
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    axios.post("http://localhost:3001/persons", {
      name: newName,
      number: newNumber,
    });
    setNewName("");
    setNewNumber("");
  };

  useEffect(() => {
    const getPersons = async () => {
      const response = await axios.get("http://localhost:3001/persons");
      setPersons(response.data);
    };
    getPersons();
  }, [handleSubmit]);

  return (
    <div>
      <h2>Phonebook</h2>

      <h2>Add a new person</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <PersonsRender persons={persons} />
    </div>
  );
};

export default App;
