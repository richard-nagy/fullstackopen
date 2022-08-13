// npx json-server --port 3001 --watch db.json

import personsService from "./services/persons";

import { useEffect, useState } from "react";

// Component to filter results
const Filter = ({ filter, setFilter }) => {
    return (
        <>
            filter <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </>
    );
};

// Component form to add new person
const PersonForm = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => {
    return (
        <form onSubmit={addPerson}>
            <h2>Add new person</h2>
            <div>
                name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
            </div>
            <div>
                number:
                <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

// Component containing persons and their datas
const Persons = ({ persons, filter, setPersons }) => {
    // Delete user from database
    const deleteUser = (id) => {
        if (window.confirm("Do you really want to delete this person?")) {
            personsService.remove(id).then(() => {
                setPersons(persons.filter((oldPerson) => oldPerson.id !== id));
            });
        }
    };

    return (
        <>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ? (
                    <div key={person.number}>
                        {person.name} | {person.number} {" | "}
                        <button onClick={() => deleteUser(person.id)}>delete</button>
                    </div>
                ) : null;
            })}
        </>
    );
};

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    // Get initial data from database
    useEffect(() => {
        console.log("Useffect!");
        personsService.getAll().then((initialPersons) => {
            setPersons(initialPersons);
        });
    }, []);

    // Add new person to database
    const addPerson = (event) => {
        event.preventDefault();

        // Check if person already exists and if he does ask if we
        // would like to update their phone number
        if (persons.find((person) => person.name === newName)) {
            if (
                window.confirm("Person already exists, would you like to update the phone number?")
            ) {
                const newPerson = persons.find((person) => person.name === newName);
                personsService
                    .update(newPerson.id, { ...newPerson, number: newNumber })
                    .then((returnedPerson) => {
                        setPersons(
                            persons.map((oldPerson) =>
                                oldPerson.id !== newPerson.id ? oldPerson : returnedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                    });
            }

            return;
        }

        // Add new person to the database
        const personOjbect = {
            name: newName,
            number: newNumber,
        };

        personsService.create(personOjbect).then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson));
            setNewName("");
            setNewNumber("");
        });
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter filter={filter} setFilter={setFilter} />
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                setNewName={setNewName}
                newNumber={newNumber}
                setNewNumber={setNewNumber}
            />
            <Persons persons={persons} filter={filter} setPersons={setPersons} />
        </div>
    );
};

export default App;
