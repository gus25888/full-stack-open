/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'

import { ALL_GENRES_VALUE, BOOKS_PER_GENRE, ALL_BOOKS } from '../utils/queries'

const Books = (props) => {
  const { genreSelected, setGenreSelected, show } = props
  const result = useQuery(ALL_BOOKS)
  const resultFiltered = useQuery(BOOKS_PER_GENRE, {
    variables: { genre: (genreSelected === ALL_GENRES_VALUE) ? '' : genreSelected },
  })

  if (!show) {
    return null
  }

  if (result.loading || resultFiltered.loading) {
    return <div>loading...</div>
  }
  if (result.error || resultFiltered.error) {
    return <div>Error detected in Books... Review console.</div>
  }

  const books = result.data.allBooks
  const genres = Array.from(new Set(books.flatMap((book) => book.genres)))
  genres.push(ALL_GENRES_VALUE)

  const booksFiltered = resultFiltered.data.allBooks
  const booksToShow = (genreSelected === ALL_GENRES_VALUE) ? books : booksFiltered

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
            booksToShow
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
