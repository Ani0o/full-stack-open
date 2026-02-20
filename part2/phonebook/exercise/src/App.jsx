import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')

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

      <div>
        filter shown with <input onChange={handleSearch}/>
      </div>

      <h2>add a new</h2>

      <form>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>

      <h2>Numbers</h2>

      {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App