import { useState } from "react"
import { useApolloClient, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { updateCache } from './utils/helpers'
import { ALL_GENRES_VALUE, ALL_BOOKS, BOOK_ADDED } from './utils/queries'

const App = () => {
  const existingToken = localStorage.getItem('libraryApp-user-token')
  const [genreSelected, setGenreSelected] = useState(ALL_GENRES_VALUE)
  const [token, setToken] = useState(existingToken)
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`"${addedBook.title}" by ${addedBook.author.name} added`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {
          (token) ?
            <>
              <button onClick={() => setPage("recommendations")}>recommendations</button>
              <button onClick={() => setPage("add")}>add book</button>
              <button onClick={() => logout()}>logout</button>
            </>
            :
            <button onClick={() => setPage("login")}>login</button>
        }
      </div>

      <Authors show={page === "authors"} notify={notify} />

      <Books show={page === "books"} ALL_GENRES={ALL_GENRES_VALUE} genreSelected={genreSelected} setGenreSelected={setGenreSelected} />

      <Recommendations show={page === "recommendations" && token} />

      <NewBook show={page === "add" && token} notify={notify} ALL_GENRES={ALL_GENRES_VALUE} genreSelected={genreSelected} />

      <LoginForm show={page === "login" && !token} notify={notify} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
