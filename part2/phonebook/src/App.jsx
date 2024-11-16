import { useState } from 'react'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchField, setSearchField] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleSearchFieldChange = (event) => setSearchField(event.target.value);

  const personsToShow = persons.filter(person =>
    (searchField) ? person.name.toLowerCase().includes(searchField.toLowerCase()) : true
  )

  const handleClick = (event) => {
    event.preventDefault();

    if (!newName) {
      alert(`name not specified`)
      return;
    }

    if (!newNumber) {
      alert(`phone number not specified`)
      return;
    }

    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
      return;
    }

    setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length + 1 }))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchField={searchField} handleSearchFieldChange={handleSearchFieldChange} />
      <h3>add a new</h3>
      <PersonForm newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        handleClick={handleClick} />
      <h3>Numbers</h3>
      <Persons persons={personsToShow} />
    </div>
  )
}

export default App

