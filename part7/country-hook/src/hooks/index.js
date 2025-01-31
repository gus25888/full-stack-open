import { useState, useEffect } from 'react'
import axios from 'axios'

const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getCountry = async (name) => {
  if (!name) {
    return null
  }
  const response = await axios.get(`${baseUrl}/${name}`)
  return response
}

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    getCountry(name).then((countryFound) => {
      setCountry(countryFound)
    })
  }, [name])

  return country
}
