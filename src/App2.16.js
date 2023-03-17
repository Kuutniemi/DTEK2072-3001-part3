import { useEffect, useState } from "react";
import { createPerson, deletePerson, getPersons } from "./api";

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

const Person = ({ person, del }) => {
  return (
    <p>
      {person.name} {person.number}{" "}
      <button onClick={() => del(person.id, person.name)}>delete</button>
    </p>
  );
};

const PersonsRender = ({ persons, del }) => {
  return (
    <div>
      {persons.map((person, i) => (
        <Person key={i} person={person} del={del} />
      ))}
    </div>
  );
};

const Notification = ({ data }) => {
  if (data.message === null) {
    return null;
  }

  if (data.error) {
    return (
      <div className="error" style={{ border: "4px solid red", padding: 20 }}>
        {data.message}
      </div>
    );
  }
  return (
    <div className="success" style={{ border: "4px solid green", padding: 20 }}>
      {data.message}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });

  useEffect(() => {
    const getData = async () => {
      const response = await getPersons();
      setPersons(response.data);
    };
    getData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      return alert(`${newName} is already added to phonebook`);
    }
    createPerson({ name: newName, number: newNumber }).then((res) => {
      if (res.status === 201) {
        setNotification({ message: `Added ${newName}`, error: false });
        setPersons(persons.concat(res.data));
        setTimeout(() => {
          setNotification({ message: null, error: false });
        }, 5000);
      }
    });
    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      deletePerson(id).then((res) => {
        if (res.status === 204) {
          setNotification({ message: `Deleted ${name}`, error: true });
          setPersons(persons.filter((person) => person.id !== id));
          setTimeout(() => {
            setNotification({ message: null, error: false });
          }, 5000);
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification data={notification} />

      <h2>Add a new person</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <PersonsRender persons={persons} del={handleDelete} />
    </div>
  );
};

export default App;
