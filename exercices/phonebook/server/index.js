const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());

let persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "040-123456",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "39-44-5323523",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "12-43-234345",
    },
    {
        id: 4,
        name: "Mary Poppendieck",
        number: "39-23-6423122",
    },
];

app.get("/api/persons", (_, response) => {
    response.send(persons);
});

app.get("/info", (_, response) => {
    response.send(
        `<div>Phonebook has info for ${persons.length} people</div><div>${new Date()}</div>`
    );
});

app.get("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find((person) => person.id === id);

    if (person) {
        response.json(person);
    } else {
        response.status(404).end();
    }
});

app.post("/api/person", (request, response) => {
    const body = request.body;

    if (!body.content) {
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

    if (persons.find((person) => person.name === body.name)) {
        return response.status(401).json({
            error: "name already exists",
        });
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId(),
    };

    persons = persons.concat(person);

    app.use(morgan("tiny", ":id :method :url :response-time"));
    response.json(note);
});

app.delete("/api/persons/:id", (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter((person) => person.id !== id);

    response.status(204).end();
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
