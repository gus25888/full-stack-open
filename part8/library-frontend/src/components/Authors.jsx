import { useQuery } from '@apollo/client'

import { ALL_AUTHORS } from '../utils/queries'

import AuthorsForm from './AuthorsForm'

const Authors = (props) => {

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.error) {
    return <div>Error detected in Authors... Review console.</div>
  }

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* eslint-disable-next-line react/prop-types */}
      <AuthorsForm notify={props.notify} authors={authors} />
    </div>
  )
}

export default Authors