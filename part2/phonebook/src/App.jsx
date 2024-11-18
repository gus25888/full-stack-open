import axios from "axios";
import { useEffect, useState } from 'react'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {

  const getPersons = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data }) => setPersons(data))
  }

  useEffect(getPersons, [])
  const [persons, setPersons] = useState([])
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

