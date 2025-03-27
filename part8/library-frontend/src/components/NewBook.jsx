/* eslint-disable react/prop-types */
import { useState } from 'react'

import { useMutation } from '@apollo/client'

import { ALL_GENRES_VALUE, BOOKS_PER_GENRE, CREATE_BOOK } from '../utils/queries'
import { updateCache } from '../utils/helpers'

const NewBook = ({ genreSelected, notify, show }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [createBook] = useMutation(CREATE_BOOK, {
    onError: (error) => {
      const errors = error.graphQLErrors[0].extensions.error.errors
      const messages = Object.values(errors).map(e => e.message).join('\n')
      // eslint-disable-next-line react/prop-types
      notify(messages)
    },
    update: (cache, response) => {
      updateCache(
        cache,
        {
          query: BOOKS_PER_GENRE,
          variables: { genre: (genreSelected === ALL_GENRES_VALUE) ? '' : genreSelected }
        },
        response.data.addBook
      )
    },
  })

  // eslint-disable-next-line react/prop-types
  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    createBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit} style={{ marginTop: '1em', marginBottom: '1em' }}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genre <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook