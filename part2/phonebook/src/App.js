import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ value, onChange }) => {
  return (
    <div>
      filter shown with <input
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

const PersonForm = ({ onSubmit, onChangeName, valueName,
  onChangeNumber, valueNumber }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input
          onChange={onChangeName}
          value={valueName}
        />
      </div>
      <div>
        number: <input
          onChange={onChangeNumber}
          value={valueNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => {
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter))
  return (
    <div>
      <ul>
        {personsToShow.map(person =>
          <Person key={person.name} person={person} />
        )}
      </ul>
    </div>
  )
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    }
    else if (newName !== '' && newNumber !== '') {
      const newPerson = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <div><h3>Add New</h3>
        <PersonForm onSubmit={addPerson}
          onChangeName={handleNameChange} valueName={newName}
          onChangeNumber={handleNumberChange} valueNumber={newNumber}
        />
      </div>
      <h3>Numbers</h3>
      <Persons persons={persons} filter={newFilter} />
    </div >
  )
}

export default App