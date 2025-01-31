import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const onReset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    onReset
  }
}

export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  const create = async (resource) => {
    try {
      const response = await axios.post(baseUrl, resource)
      setResources(resources.concat(response.data))
      return response.data
    } catch (error) {
      console.error(error)
      return undefined
    }
  }

  const getAll = async (baseUrl) => {
    try {
      const response = await axios.get(baseUrl)
      return response.data
    } catch (error) {
      console.error(error)
      return undefined
    }

  }

  useEffect(() => {
    getAll(baseUrl).then((data) => {
      setResources(data)
    })
  }, [baseUrl])


  const service = {
    create
  }

  return [
    resources, service
  ]
}