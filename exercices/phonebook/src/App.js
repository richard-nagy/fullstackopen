import { useState } from "react";

const Filter = ({ filter, setFilter }) => {
    return (
        <>
            filter <input value={filter} onChange={(e) => setFilter(e.target.value)} />
        </>
    );
};

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

const Persons = ({ persons, filter }) => {
    return (
        <>
            <h2>Numbers</h2>
            {persons.map((person) => {
                return person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()) ? (
                    <div key={person.number}>
                        {person.name} - {person.number}
                    </div>
                ) : null;
            })}
        </>
    );
};

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas", number: "0123456789" }]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [filter, setFilter] = useState("");

    const addPerson = (event) => {
        event.preventDefault();

        if (persons.find((person) => person.name === newName)) {
            alert(`${newName} already taken!`);
            return;
        }

        setPersons([...persons, { name: newName, number: newNumber }]);
        setNewName("");
        setNewNumber("");
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
            <Persons persons={persons} filter={filter} />
        </div>
    );
};

export default App;
