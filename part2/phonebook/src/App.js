import { useState, useEffect } from 'react'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import numberService from './services/numbers'

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

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  useEffect(() => {
    numberService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

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

      numberService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = id => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Really delete ${name}?`)) {
      numberService
        .update(id)
        .then(() => {
          setPersons(persons.filter(person =>
            person.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} value={newFilter} />
      <div><h3>Add New</h3>
        <NewPerson onSubmit={addPerson}
          onChangeName={handleNameChange} valueName={newName}
          onChangeNumber={handleNumberChange} valueNumber={newNumber}
        />
      </div>
      <h3>Numbers</h3>
      <ul>
        {personsToShow.map(person =>
          <Person
            key={person.id}
            person={person}
            removePerson={() => removePerson(person.id)}
          />
        )}
      </ul>
    </div >
  )
}

export default App