import { useState, useEffect } from 'react'
import axios from 'axios'

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
          <button type="submit" onClick={props.handleClick}>add</button>
        </div>
      </form>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = search 
    ? persons.filter(person => {
      const pattern = new RegExp(search, "i")

      const isMatch = pattern.test(person.name)
      return isMatch
    })
    : persons

  const handleClick = (event) => {
    event.preventDefault()

    const exists = persons.some((person) => person.name === newName)
    if (exists === true) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleSearch={handleSearch} />

      <h2>add a new</h2>

      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} handleClick={handleClick} />

      <h2>Numbers</h2>

      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App