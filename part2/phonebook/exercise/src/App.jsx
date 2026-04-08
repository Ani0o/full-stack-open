import { useState, useEffect } from 'react'
import personServices from './services/persons'

const Filter = (props) => {
  return (
    <div>
        filter shown with <input onChange={props.handleSearch}/>
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <div>
      <form>
        <div>
          name: <input value={props.newName} onChange={props.handleName} />
        </div>
        <div>
          number: <input value={props.newNumber} onChange={props.handleNumber}/>
        </div>
        <div>
          <button type="submit" onClick={props.handleAdd}>add</button>
        </div>
      </form>
    </div>
  )
}

const Person = ({ name, number, handleDelete }) => {
  return (
    <div>
      {name} {number}
      <button onClick={handleDelete}>delete</button>
    </div>
  )
}

const Notification = ({ message, className }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={className}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [className, setClassName] = useState('success')

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = search 
    ? persons.filter(person => {
      const pattern = new RegExp(search, "i")

      const isMatch = pattern.test(person.name)
      return isMatch
    })
    : persons

  const handleAdd = (event) => {
    event.preventDefault()

    const person = persons.find((person) => person.name === newName)

    if (person !== undefined) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (confirm === false) return

      const personObject = { ...person, number: newNumber }

      personServices
        .update(person.id, personObject)
        .then(returnedPerson => {
          setClassName('success')
          setErrorMessage(`Updated ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.map(p => p.name === person.name ? returnedPerson : p))
        })
        .catch(error => {
          setClassName('error')
          setErrorMessage(`Information of ${person.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.filter(p => p.name !== person.name))
        })
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      console.log(person)
      personServices
        .create(personObject)
        .then(returnedPerson => {
          setClassName('success')
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)

          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setClassName('error')
          setErrorMessage(`${error.response.data.error}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          console.log(error.response.data.error)
        })
    }
  }

  const handleName = (event) => {
    setNewName(event.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleDelete = (id) => {
    const url = `http://localhost:3001/api/persons/${id}`
    const person = persons.find(person => person.id === id)

    const confirm = window.confirm(`Delete ${person.name}`)
    if (confirm === false) return

    personServices
      .remove(url)
      .then(() => {
        setClassName('success')
        setErrorMessage(`Deleted ${person.name}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)

        setPersons(persons.filter(p => p.id !== person.id))
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} className={className} />

      <Filter handleSearch={handleSearch} />

      <h2>add a new</h2>

      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} handleAdd={handleAdd} />

      <h2>Numbers</h2>

      <div>
      {personsToShow.map(person => <Person key={person.id} name={person.name} number={person.number} handleDelete={() => handleDelete(person.id)} />)}
      </div>
    </div>
  )
}

export default App