require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.static("build"));

app.use(cors());
app.use(express.json());

app.get("/api/persons", (_, response) => {
    Person.find({}).then((persons) => {
        response.json(persons);
    });
});

app.get("/info", (_, response) => {
    response
        .send
        // `<div>Phonebook has info for ${persons.length} people</div><div>${new Date()}</div>`
        ();
});

app.get("/api/persons/:id", (request, response) => {
    const person = request.params.id;

    if (person) {
        Person.findById(person).then((person) => {
            response.json(person);
        });
    } else {
        console.log("No person found");
        response.status(404).end();
    }
});

app.put("/api/persons/:id", (request, response, next) => {
    const body = request.body;

    const person = {
        name: body.name,
        number: body.number,
    };

    Person.findByIdAndUpdate(request.params.id, person, { new: true })
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});

app.post("/api/persons", (request, response, next) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json({
            error: "content missing",
        });
    }

    if (!body.name) {
        return response.status(401).json({
            error: "missing name",
        });
    }

    if (!body.number) {
        return response.status(401).json({
            error: "mssing number",
        });
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    // app.use(morgan("tiny", ":id :method :url :response-time"));
    person
        .save()
        .then((savedPerson) => {
            response.json(savedPerson);
        })
        .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    }

    next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
