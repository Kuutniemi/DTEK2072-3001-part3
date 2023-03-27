const express = require("express");
const app = express();
var morgan = require("morgan");
const cors = require("cors");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

// Use static build to serve frontend
app.use(express.static("build"));

const errorHandler = (error, request, response, next) => {
  console.log("ERROR", error);
  // console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const Yhteystiedot = require("./helpers/yhteystiedotdb");

let persons = [];

app.get("/api/persons", async (req, res) => {
  const persons = await Yhteystiedot.find({});
  res.status(200).json(persons);
});

app.get("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  console.log("ID: ", id);
  Yhteystiedot.findById(id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", async (req, res, next) => {
  // console.log("ID: ", req.params.id, " deleted");
  const id = req.params.id;
  // persons = persons.filter((person) => person._id !== id);
  await Yhteystiedot.findByIdAndRemove(id).catch((error) => {
    next(error);
  });
  res.status(204).end();
});

app.post("/api/persons", async (req, res) => {
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
  const newPerson = new Yhteystiedot({
    name: body.name,
    number: body.number,
  });
  newPerson.save().then((yht) => {
    persons = persons.concat(newPerson);
    console.log(yht);
  });
  res.status(201).json(newPerson);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
});

app.use(errorHandler);

const PORT = 4321;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
