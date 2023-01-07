import { useState, useEffect } from 'react'
import Person from './components/Person'
import NewPerson from './components/NewPerson'
import numberService from './services/numbers'
import './index.css'

const Notification = ({ message, type }) => {
  if (message == null)
    return null
  else {
    return (
      <div className={String(type)} >
        {message}
      </div >
    )
  }

}

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
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState('')

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

  const updatePerson = () => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      const person = persons.find(p => p.name === newName)
      const changedPerson = { ...person, number: newNumber }

      numberService
        .update(person.id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(n => n.id !== person.id ? n : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationType('notification')
          setNotificationMessage(`Updated ${returnedPerson.name} number success.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(_error => {
          setNotificationType('error')
          setNotificationMessage(`the person '${person.name}' was already deleted from the server`)
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== person.id))
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(person => person.name === newName)) {
      updatePerson()
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
          setNotificationType('notification')
          setNotificationMessage(`Added ${returnedPerson.name} success.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
          setNotificationType('notification')
          setNotificationMessage(`${name} deleted successfully.`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(_error => {
          setNotificationType('error')
          setNotificationMessage(`the person '${name}' was already deleted from the server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        })
    }
  }

  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} type={notificationType} />
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