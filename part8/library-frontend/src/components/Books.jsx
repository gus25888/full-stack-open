import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const ALL_GENRES = 'all genres'
  const [genreSelected, setGenreSelected] = useState(ALL_GENRES)
  const result = useQuery(ALL_BOOKS)

  if (result.loading) {
    return <div>loading...</div>
  }
  if (result.error) {
    return <div>Error detected... Review console.</div>
  }

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

  const genres = Array.from(new Set(books.flatMap((book) => book.genres)))
  genres.push(ALL_GENRES)

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{`"${genreSelected}"`}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books
              .filter(book => {
                if (genreSelected === ALL_GENRES) {
                  return true
                }

                return book.genres.includes(genreSelected)
              })
              .map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))
          }
          <tr>
            <td>
              {
                genres.map(genre => (
                  <button key={genre} onClick={() => { setGenreSelected(genre) }}>
                    {genre}
                  </button>
                ))
              }
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Books
