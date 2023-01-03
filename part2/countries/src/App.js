import { useState, useEffect } from 'react'
import axios from 'axios'

const Languages = ({ languages }) =>
  Object.entries(languages).map(([key, value]) =>
    <li key={key}>{value}</li>
  )

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>Capital: {country.capital}</div>
      <div>Area: {country.area}</div>
      <h3>Languages</h3>
      <ul>
        <Languages languages={country.languages} />
      </ul>
      <div>
        <img src={country.flags.png} alt={country.name.common + " Flag"} />
      </div>
    </div>
  )
}

const Countries = ({ countries, filter, setFilter }) => {
  const countriesToShow = countries.filter(country =>
    country.name.common.toLowerCase().includes(filter.toLowerCase()))
  const buttonClickHandler = name => {
    setFilter(name)
  }
  if (countriesToShow.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  } else if (countriesToShow.length > 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name.common}>
            {country.name.common}
            <button
              onClick={() => buttonClickHandler(country.name.common)}>
              Show
            </button>
          </div>
        )}
      </div>
    )
  } else if (countriesToShow.length === 1)
    return (<Country country={countriesToShow[0]} />)
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleCountriesChange = (event) => setFilter(event.target.value)

  return (
    <div>
      find countries <input
        onChange={handleCountriesChange}
        value={filter}
      />
      <div>
        <Countries countries={countries} filter={filter} setFilter={setFilter} />
      </div>
    </div>
  )
}

export default App