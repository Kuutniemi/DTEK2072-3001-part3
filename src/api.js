import axios from "axios";

export const getPersons = async () => {
  const response = await axios.get("http://localhost:3001/persons");
  return response;
};

export const createPerson = async (newPerson) => {
  const response = await axios.post("http://localhost:3001/persons", newPerson);
  return response;
};

export const deletePerson = async (id) => {
  const response = await axios.delete(`http://localhost:3001/persons/${id}`);
  return response;
};
