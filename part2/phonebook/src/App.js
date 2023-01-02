import { useState } from 'react'

const Numbers = ({ persons, filter }) => {
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

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
    <div> debug: {newFilter}
      <h2>Phonebook</h2>
      <div>
        filter shown with <input
          onChange={handleFilterChange}
          value={newFilter}
        />
      </div>
      <div><h3>Add New</h3>
        <form onSubmit={addPerson}>
          <div>
            name: <input
              onChange={handleNameChange}
              value={newName}
            />
          </div>
          <div>
            number: <input
              onChange={handleNumberChange}
              value={newNumber}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </div>
      <h2>Numbers</h2>
      <Numbers persons={persons} filter={newFilter} />
    </div>
  )
}

export default App