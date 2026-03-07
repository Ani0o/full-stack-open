import { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({searchResult}) => {
  if (searchResult.length > 10 && searchResult.length != 250) {
    return(
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  else if (searchResult.length != 1 && searchResult.length <= 10) {
    return(
      <div>
        {searchResult.map(country => {
          return(
            <div key={country.name.common}>
              {country.name.common}
            </div>
          )
        })}
      </div>
    )
  }
  
  else if (searchResult.length == 1) {
    const languages = Object.values(searchResult[0].languages)

    return(
      <div>
        <h1>{searchResult[0].name.common}</h1>

        Capital {searchResult[0].capital} <br />
        Area {searchResult[0].area}

        <h1>Languages</h1>
        <ul>
          {languages.map(language => <li key={language}>{language}</li>)}
        </ul>

        <img src={searchResult[0].flags.png} alt={searchResult[0].flags.alt}></img>
      </div>
    )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const searchResult = countries.filter(country => {
    const pattern = new RegExp(value, 'i')
    return pattern.test(country.name.common)
  })

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  return(
    <div>
      <div>
        find countries <input value={value} onChange={handleChange}></input>
      </div>
      <Data searchResult={searchResult} />
    </div>
  )
}

export default App