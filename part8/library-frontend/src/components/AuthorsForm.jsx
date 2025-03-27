/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useMutation } from "@apollo/client"
import Select from 'react-select'


import { ALL_AUTHORS, EDIT_AUTHOR } from '../utils/queries'

const AuthorsForm = ({ notify, authors }) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  })

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name
    }
  })
  options.push({ value: null, label: null })
  const submit = (event) => {
    event.preventDefault()
    console.log({ name, year })

    const setBornTo = year.length === 0 ? Infinity : Number(year)

    if (setBornTo === Infinity) {
      notify('born year must be a valid number')
      return
    }

    editAuthor({ variables: { name, setBornTo } })

    setName('')
    setYear('')
    document.getElementById("author").value = null
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      notify('author not found')
    }
  }, [result.data])  // eslint-disable-line


  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select
            id="author"
            isClearable
            isSearchable
            placeholder={'Select an author...'}
            onChange={({ value }) => { setName(value) }}
            options={options}
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                width: '300px',
                borderColor: state.isFocused ? 'blue' : 'gray',
              }),
            }}
          />
        </div>
        <div>
          born
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default AuthorsForm