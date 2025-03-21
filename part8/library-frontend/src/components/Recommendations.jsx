import { useQuery } from '@apollo/client'

import { ALL_BOOKS, LOGGEDIN_USER } from '../queries'

const Recommendations = (props) => {
  const result = useQuery(ALL_BOOKS)
  const userResult = useQuery(LOGGEDIN_USER)

  if (result.loading || userResult.loading) {
    return <div>loading...</div>
  }
  if (result.error || userResult.error) {
    return <div>Error detected... Review console.</div>
  }

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks
  const favoriteGenre = userResult.data.me.favoriteGenre

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{`"${favoriteGenre}"`}</b></p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
            books
              .filter(book => book.genres.includes(favoriteGenre))
              .map((book) => (
                <tr key={book.title}>
                  <td>{book.title}</td>
                  <td>{book.author.name}</td>
                  <td>{book.published}</td>
                </tr>
              ))
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
