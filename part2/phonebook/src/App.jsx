import { useEffect, useState } from 'react'

import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons"

const App = () => {

  const updatePhone = (id, phoneNumber) => {
    // TODO: Implement exercise 2.15
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id);
    if (!personToDelete) {
      alert(`the person was not found in server`)
      return;
    }

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
        .deleteRegister(id)
        .then(personDeleted => {
          setPersons(persons.filter(person => person.id !== personDeleted.id))
        })
        .catch(error => {
          alert(`the person '${personToDelete.name}' was already deleted from server`)
          setPersons([...persons])
        })
    }
  }

  const getPersons = () => {
    personsService.readAll()
      .then((personsObtained) => setPersons(personsObtained))
  }

  useEffect(getPersons, []);
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchField, setSearchField] = useState('');

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
    const newPerson = { name: newName, number: newNumber };

    personsService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('')
        setNewNumber('')
      }).catch(error => {
        alert(`${newName} could not be added to phonebook`);
        console.error(error)
        setPersons([...persons]);
      })
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
      <Persons persons={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App

