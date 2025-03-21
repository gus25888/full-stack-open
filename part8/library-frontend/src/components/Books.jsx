/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'

import { BOOKS_PER_GENRE, ALL_BOOKS } from '../queries'

const Books = (props) => {
  const { ALL_GENRES, genreSelected, setGenreSelected, show } = props
  const result = useQuery(ALL_BOOKS)
  const resultFiltered = useQuery(BOOKS_PER_GENRE, {
    variables: { genre: (genreSelected === ALL_GENRES) ? '' : genreSelected },
  })
  if (result.loading || resultFiltered.loading) {
    return <div>loading...</div>
  }
  if (result.error || resultFiltered.error) {
    return <div>Error detected... Review console.</div>
  }

  if (!show) {
    return null
  }

  const books = result.data.allBooks
  const genres = Array.from(new Set(books.flatMap((book) => book.genres)))
  genres.push(ALL_GENRES)

  const booksFiltered = resultFiltered.data.allBooks

  return (
    <div>
      <h2>books</h2>
      <p>in genre <b>{`"${props.genreSelected}"`}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            booksFiltered
              .map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))
          }
          <tr>
            <td colSpan="3">
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
