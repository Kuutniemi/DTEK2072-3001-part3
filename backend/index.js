const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Use static build to serve frontend
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number missing",
    });
  }
  if (persons.find((person) => person.name === body.name)) {
    return res.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000),
  };
  persons = persons.concat(person);
  res.status(201).json(person);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

const PORT = 4321;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
