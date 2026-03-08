import { useState, useEffect } from 'react'
import axios from 'axios'

const Data = ({ searchResult }) => {
  const [weatherData, setWeatherData] = useState(null)
  const [loading, setLoading] = useState(true)
  const languages = Object.values(searchResult.languages)

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${searchResult.capital}&appid=${import.meta.env.VITE_SOME_KEY}`)
      .then(response => {
        setWeatherData(response.data)
        setLoading(false)
      })
  }, [searchResult])

  if (loading) return
  const imgSrc = `https://openweathermap.org/payload/api/media/file/${weatherData.weather[0].icon}%402x.png`

  return (
    <div>
      <h1>{searchResult.name.common}</h1>

      Capital {searchResult.capital} <br />
      Area {searchResult.area}

      <h1>Languages</h1>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={searchResult.flags.png} alt={searchResult.flags.alt} />

      <h1>Weather in {searchResult.capital}</h1>

      Temperature {[weatherData.main.temp] - 273.15} Celsius
      <br />
      <img src={imgSrc} alt={weatherData.weather[0].description} />
      <br />
      Wind {weatherData.wind.speed} m/s
    </div>
  )
}

const Country = ({ searchResult, showData, handleShowData }) => {
  if (searchResult.length > 10 && searchResult.length !== 250) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }

  else if (searchResult.length !== 1 && searchResult.length <= 10) {
    return (
      <div>
        {searchResult.map(country => {
          return (
            <div key={country.name.common}>
              {country.name.common}
              <button onClick={() => handleShowData(country.name.common)}>{showData[country.name.common] ? 'hide' : 'show'}</button>
              {showData[country.name.common] && <Data searchResult={country} />}
            </div>
          )
        })}
      </div>
    )
  }
  
  else if (searchResult.length === 1) {
    return (
      <Data searchResult={searchResult[0]} />
    )
  }
}

const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [showData, setShowData] = useState({})

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => setCountries(response.data))
  }, [])

  const searchResult = countries.filter(country => {
    const pattern = new RegExp(value, 'i')
    return pattern.test(country.name.common)
  })

  useEffect(() => {
    const newShowData = {}
    searchResult.forEach(country => {
      newShowData[country.name.common] = false
    })
    setShowData(newShowData)
  }, [value, countries])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const handleShowData = (countryName) => {
    setShowData(prev => {
      return (
        {...prev, [countryName]: !prev[countryName]}
      )
    })
  }

  return (
    <div>
      <div>
        find countries <input value={value} onChange={handleChange}></input>
      </div>
      <Country searchResult={searchResult} showData={showData} handleShowData={handleShowData} />
    </div>
  )
}

export default App