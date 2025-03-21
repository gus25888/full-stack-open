import { useState } from "react"

import { useApolloClient } from '@apollo/client'


import Authors from "./components/Authors"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import Recommendations from "./components/Recommendations"

const App = () => {
  const ALL_GENRES = 'all genres'
  const [genreSelected, setGenreSelected] = useState(ALL_GENRES)
  const [token, setToken] = useState(localStorage.getItem('libraryApp-user-token') || null)
  const [page, setPage] = useState("authors")
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

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

      <Books show={page === "books"} ALL_GENRES={ALL_GENRES} genreSelected={genreSelected} setGenreSelected={setGenreSelected} />

      <Recommendations show={page === "recommendations" && token} />

      <NewBook show={page === "add" && token} notify={notify} ALL_GENRES={ALL_GENRES} genreSelected={genreSelected} />

      <LoginForm show={page === "login" && !token} notify={notify} setToken={setToken} setPage={setPage} />
    </div>
  );
};

export default App;
