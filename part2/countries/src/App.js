import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState([])
  const weather_api = process.env.REACT_APP_API_KEY

  const direction = (degree) => {
    let windDirection = 'N'
    if (degree < 33.75)
      windDirection = 'NNE'
    else if (degree < 56.25)
      windDirection = 'NE'
    else if (degree < 78.75)
      windDirection = 'ENE'
    else if (degree < 101.25)
      windDirection = 'E'
    else if (degree < 123.75)
      windDirection = 'ESE'
    else if (degree < 146.25)
      windDirection = 'SE'
    else if (degree < 168.75)
      windDirection = 'SSE'
    else if (degree < 191.25)
      windDirection = 'S'
    else if (degree < 213.75)
      windDirection = 'SSW'
    else if (degree < 236.25)
      windDirection = 'SW'
    else if (degree < 258.75)
      windDirection = 'WSW'
    else if (degree < 281.25)
      windDirection = 'W'
    else if (degree < 303.75)
      windDirection = 'WNW'
    else if (degree < 326.25)
      windDirection = 'NW'
    else if (degree < 348.75)
      windDirection = 'NNW'
    return windDirection
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.cca3}&appid=${weather_api}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeatherData(response.data)
      })
  }, [weather_api, country.cca3, country.capital])
  return (
    <div>
      <div>
        Temperature: {(weatherData.main.temp - 273.15) * 9 / 5 + 32} degrees F
      </div>
      <div>
        <img alt={weatherData.weather[0].description}
          src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
        />
      </div>
      <div>
        Wind: {direction(weatherData.wind.deg)} at {weatherData.wind.speed * 2.237} miles/h
      </div>
    </div>
  )
}

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
      <h3>Weather in {country.capital}</h3>
      <Weather country={country} />
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